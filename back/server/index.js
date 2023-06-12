const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");
const articleRoutes = require("./routes/articles");
const coinRoutes = require("./routes/coins");
const watchlistRoutes = require("./routes/watchlist");
const transactionRoutes = require("./routes/transactions");
const mailerRoutes = require("./routes/mail");
const cors = require("cors");

const app = express();
const port = 3030;

app.use(bodyParser.json());
app.use(cors());
app.use("/mailer", mailerRoutes);
app.use("/auth", authRoutes);
app.use("/articles", articleRoutes);
app.use("/coins", coinRoutes);
app.use("/watchlist", watchlistRoutes);
app.use("/transactions", transactionRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
