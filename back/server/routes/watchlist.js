const express = require("express");
const User = require("../models/User");

const router = express.Router();

router.post("/add", async (req, res) => {
  try {
    const { userId, coinId } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.watchlist.push(coinId);
    await user.save();

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

router.post("/remove", async (req, res) => {
  try {
    const { userId, coinId } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const index = user.watchlist.indexOf(coinId);

    if (index !== -1) {
      user.watchlist.splice(index, 1);
    }

    await user.save();

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

module.exports = router;
