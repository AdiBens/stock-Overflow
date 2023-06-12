import { useSelector } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import PortfolioCard from "./protfoliocard";
import { useEffect, useState } from "react";
import History from "./history/history";

function Portfolio({ formatter }) {
  const userInfo = useSelector((state) => state.user.user[0]);
  const [userCoins, setUserCoins] = useState([]);
  const [totalWorth, setTotalWorth] = useState(0);

  const calcCoins = (n) => {
    setTotalWorth((oldVal) => oldVal + n);
  };

  const handleSellAmount = (val) => {
    setTotalWorth((oldVal) => oldVal - val);
  };

  useEffect(() => {
    if (userInfo.myCoins) {
      const filtered = userInfo.myCoins.filter((coin) => {
        return coin.value > 0;
      });
      setUserCoins(filtered);
    }
  }, [userInfo]);

  return (
    <div className="portfolioPage">
      <h1 className="pageTitle">Portfolio</h1>
      <div className="portfolioTop">
        <div className="currentUserBalance">
          Balance In USD : {formatter.format(userInfo.balance)}
        </div>
        <div className="currentUserCoinsBalance">
          Total Coins Worth : {formatter.format(totalWorth)}
        </div>
        <div
          className="coinNUsdTotalBalance"
          style={{
            backgroundColor:
              +userInfo.balance + totalWorth >= 100_000 ? "green" : "red",
          }}
        >
          Total Worth : {formatter.format(+userInfo.balance + totalWorth)}
        </div>
      </div>
      {userCoins.length > 0 ? (
        <TableContainer
          sx={{ boxShadow: "none" }}
          component={Paper}
          style={{ padding: "30px" }}
          className="tableContainer"
        >
          <Table
            sx={{
              minWidth: 300,
              maxWidth: "1420px",
              border: "3px solid black",
              marginBottom: "20px",
            }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell
                  align="center"
                  sx={{ fontWeight: "bolder", fontSize: 18 }}
                >
                  Image
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontWeight: "bolder", fontSize: 18 }}
                >
                  Coin Name
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontWeight: "bolder", fontSize: 18 }}
                >
                  Coin Symbol
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontWeight: "bolder", fontSize: 18 }}
                >
                  Current Price
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontWeight: "bolder", fontSize: 18 }}
                >
                  Amount
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontWeight: "bolder", fontSize: 18 }}
                >
                  Total
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontWeight: "bolder", fontSize: 18 }}
                >
                  Sell
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userCoins.map((coin) => (
                <PortfolioCard
                  key={coin.id}
                  coin={coin}
                  formatter={formatter}
                  calcCoins={calcCoins}
                  handleSellAmount={handleSellAmount}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <h1 style={{ marginTop: "30px" }}>
          Crypto portfolio is empty. Start investing now!
        </h1>
      )}
      <History />
    </div>
  );
}

export default Portfolio;
