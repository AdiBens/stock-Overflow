const express = require("express");
const Article = require("../models/Article");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const articles = await Article.find();
    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

router.post("/create", async (req, res) => {
  try {
    const { title, content } = req.body;

    const article = new Article({
      title,
      content,
    });

    await article.save();

    res.json(article);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

module.exports = router;
