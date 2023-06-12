const express = require("express");
const axios = require("axios");
const { apiKey } = require("../config");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.coinmarketcap.com/v2/ticker/?limit=10&apiKey=${apiKey}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

module.exports = router;
