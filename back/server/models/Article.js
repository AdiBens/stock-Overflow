const mongoose = require("../db");

const articleSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
});

const Article = mongoose.model("articles", articleSchema);

module.exports = Article;
