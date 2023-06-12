const express = require("express");
const nodemailer = require("nodemailer");
const { emailConfig } = require("../config");

const router = express.Router();

const transporter = nodemailer.createTransport(emailConfig);

router.post("/send", (req, res) => {
  const { from, to, subject, text, html } = req.body;

  const mailOptions = {
    from,
    to,
    subject,
    text,
    html,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while sending the email" });
    } else {
      console.log("Email sent:", info.response);
      res.json({ message: "Email sent successfully" });
    }
  });
});

module.exports = router;
