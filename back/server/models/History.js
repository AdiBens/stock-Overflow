const mongoose = require("../db");

const historySchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
  action: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const History = mongoose.model("actionhistories", historySchema);

module.exports = History;
