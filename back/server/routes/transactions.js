const express = require("express");
const User = require("../models/User");
const History = require("../models/History");

const router = express.Router();

router.post("/buy", async (req, res) => {
  try {
    const { userId, coinId, quantity } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Perform buy logic
    // ...

    const history = new History({
      user: userId,
      action: `Bought ${quantity} of coin ${coinId}`,
    });

    await history.save();

    res.json({ message: "Buy transaction successful" });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

router.post("/sell", async (req, res) => {
  try {
    const { userId, coinId, quantity } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Perform sell logic
    // ...

    const history = new History({
      user: userId,
      action: `Sold ${quantity} of coin ${coinId}`,
    });

    await history.save();

    res.json({ message: "Sell transaction successful" });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

module.exports = router;
