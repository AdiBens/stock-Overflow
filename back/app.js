"use strict";
const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const validator = require("validator");
const nodemailer = require("nodemailer");
require("dotenv").config();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const apiKey = process.env.API_KEY;
const apiKey2 = process.env.API_KEY2;
const dbConnection = process.env.DB_CONNECTION;

mongoose.connect(dbConnection).then(() => console.log("Connected to Db!"));

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  balance: {
    type: String,
    default: "100000",
  },
  myCoins: {
    type: Object,
    default: {},
  },
  watchList: Array,
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

const articleSchema = mongoose.Schema({
  title: String,
  content: String,
  creator: String,
  category: String,
  date: String,
});

const historySchema = mongoose.Schema({
  userId: String,
  date: String,
  amount: String,
  price: String,
  coinName: String,
  action: String,
});

const User = new mongoose.model("users", userSchema);
const Article = new mongoose.model("articles", articleSchema);
const History = new mongoose.model("actionhistories", historySchema);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

app.post("/login", (req, res) => {
  if (req.body.params.email && req.body.params.password) {
    User.find({ email: req.body.params.email })
      .then((doc) => {
        bcrypt.compare(
          req.body.params.password,
          doc[0].password,
          function (err, result) {
            if (err) {
              res.send({ status: "400" });
              return;
            }
            if (result) {
              res.send({ status: "200", user: doc });

              return;
            }
            res.send({ status: "401" });
          }
        );
      })
      .catch((err) => {
        console.log(err);
        res.send({ status: "404" });
      });
    return;
  }
  res.send({ status: "400" });
});

app.post("/register", async (req, res) => {
  if (
    req.body.params.email &&
    req.body.params.password &&
    req.body.params.name
  ) {
    User.find({ email: req.body.params.email }).then((doc) => {
      if (doc.length > 0) {
        res.send({ status: "401" });
      } else {
        if (validator.isEmail(req.body.params.email)) {
          bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(req.body.params.password, salt, function (err, hash) {
              const newUser = new User({
                name: req.body.params.name.slice(0, 9),
                email: req.body.params.email,
                password: hash,
              })
                .save()
                .then((user) => res.send({ status: "200", user: user }))
                .catch((err) => res.send(err));
            });
          });
        } else {
          res.send({ status: "404" });
        }
      }
    });
    return;
  }
  res.send({ status: "400" });
});

app.post("/findUser", (req, res) => {
  User.find({ _id: req.body.params._id }).then((doc) => {
    res.send({ status: "200", user: doc });
  });
});

app.get("/articles", (req, res) => {
  Article.find({}).then((doc) => {
    res.send(doc);
  });
});

app.post("/addnewarticle", (req, res) => {
  const newArticle = new Article(req.body.params.article)
    .save()
    .then((resp) => {
      console.log(resp);
      res.send(resp);
    });
});

app.post("/deletearticle", (req, res) => {
  Article.deleteOne({ _id: req.body.params._id }).then((resp) => {
    console.log(resp);
    res.send(resp);
  });
});

app.get("/singlecoinapi", async (req, res) => {
  let coin = req.query.symbol || "BNB";
  try {
    const { data } = await axios.get(
      `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest`,
      {
        headers: {
          "X-CMC_PRO_API_KEY": apiKey,
          Accept: "application/json",
        },
        params: {
          symbol: coin,
        },
      }
    );
    res.send(data);
  } catch (error) {
    if (error.response && error.response.status === 429) {
      const { data } = await axios.get(
        `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest`,
        {
          headers: {
            "X-CMC_PRO_API_KEY": apiKey2,
            Accept: "application/json",
          },
          params: {
            symbol: coin,
          },
        }
      );
      res.send(data);
    } else {
      res.send("Error occurred");
      console.log(error);
    }
  }
});

app.get("/coinlistapi", async (req, res) => {
  try {
    const { data } = await axios.get(
      `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest`,
      {
        headers: {
          "X-CMC_PRO_API_KEY": apiKey,
          Accept: "application/json",
        },
        params: {
          limit: 1500,
        },
      }
    );
    res.send(data.data);
  } catch (error) {
    if (error.response && error.response.status === 429) {
      const { data } = await axios.get(
        `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest`,
        {
          headers: {
            "X-CMC_PRO_API_KEY": apiKey2,
            Accept: "application/json",
          },
          params: {
            limit: 1500,
          },
        }
      );
      res.send(data.data);
    } else {
      res.send("Error occurred");
      console.log(error);
    }
  }
});

app.get("/watchlist/api", (req, res) => {
  User.findOneAndUpdate(
    { _id: req.query._id },
    { $push: { watchList: req.query.addToWatchList } },
    { new: true, runValidators: true }
  )
    .then((updatedItem) => {
      res.send(updatedItem);
    })
    .catch((err) => {
      console.error(err);
    });
});

app.get("/watchlistremove/api", (req, res) => {
  User.findOneAndUpdate(
    { _id: req.query._id },
    { $pull: { watchList: req.query.removeFromList } },
    { new: true, runValidators: true }
  )
    .then((updatedItem) => {
      res.send(updatedItem);
    })
    .catch((err) => {
      console.error(err);
    });
});

app.post("/buycoin/api", (req, res) => {
  const coinName = req.body.params.coinName;
  const coinAmount = parseFloat(req.body.params.amount);
  const balance = parseFloat(req.body.params.currentBalance);

  User.findOneAndUpdate(
    { _id: req.body.params._id, "myCoins.id": coinName },
    {
      $set: { balance: balance },
      $inc: { "myCoins.$.value": coinAmount },
    },
    { new: true, runValidators: true }
  )
    .then((updatedItem) => {
      if (!updatedItem) {
        return User.findOneAndUpdate(
          { _id: req.body.params._id },
          {
            $set: { balance: balance },
            $push: { myCoins: { id: coinName, value: coinAmount } },
          },
          { new: true, runValidators: true }
        );
      }
      return updatedItem;
    })
    .then((updatedItem) => {
      res.send(updatedItem);
    })
    .catch((err) => {
      console.error(err);
    });
});

app.post("/sellcoin/api", (req, res) => {
  const coinName = req.body.params.coinName;
  const coinAmount = parseFloat(req.body.params.amount);
  const balance = parseFloat(req.body.params.currentBalance);

  User.findOneAndUpdate(
    { _id: req.body.params._id, "myCoins.id": coinName },
    { $set: { balance: balance }, $inc: { "myCoins.$.value": -coinAmount } },
    { new: true, runValidators: true }
  )
    .then((updatedItem) => {
      res.send(updatedItem);
    })
    .catch((err) => {
      console.error(err);
    });
});

app.get("/history", (req, res) => {
  History.find({ userId: req.query._id }).then((history) => {
    res.send(history);
  });
});

app.post("/sethistory/api", (req, res) => {
  const newHistory = new History(req.body.params).save().then((resp) => {
    res.send(resp);
  });
});

app.post("/sendmail/api", (req, res) => {
  transporter
    .sendMail({
      // from: "gshadiadi@gmail.com",
      from: req.body.params.mail.email,
      to: "gshadiadi@gmail.com",
      subject: `Become Writer `,
      text: "Hello world?",
      html: `<h1>From: ${req.body.params.mail.email} </h1>
      <h2>${req.body.params.mail.name}</h2>
    <br>
    <h2>${req.body.params.mail.content}</h2>
    `,
    })
    .then(() => {
      res.send("sent");
      transporter.sendMail({
        from: "gshadiadi@gmail.com",
        to: req.body.params.mail.email,
        subject: `Stocks Overflow`,
        text: "Hello world?",
        html: `<h1>Thank You For Contact</h1>
        <h3>Our team will do the best to review your request as soon as possible</h3>
      `,
      });
    });
});

app.listen(3030, console.log("Welcome From 3030!"));
