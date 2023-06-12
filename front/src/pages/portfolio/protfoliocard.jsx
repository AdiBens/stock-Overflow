import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import SellModal from "./sellmodal";
import Logo from "../../assets/logo.png";

function PortfolioCard({ coin, formatter, calcCoins, handleSellAmount }) {
  const [coinData, setCoinData] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [currentImg, setCurrentImg] = useState(null);
  const [coinPrice, setCoinPrice] = useState(0);

  const getData = async () => {
    const { data } = await axios.get("http://localhost:3030/singlecoinapi", {
      params: {
        symbol: coin.id,
      },
    });
    if (data.data == "error") {
      alert("Something Went Wrong");
      setLoading(false);
      return;
    }
    if (!data.data[coin.id]) {
      setLoading(false);
      return;
    }
    setCoinData(data.data[coin.id]);
    setLoading(false);
    setCoinPrice(data.data[coin.id].quote.USD.price);
    calcCoins(data.data[coin.id].quote.USD.price * coin.value);
  };

  const handleImageError = () => {
    setCurrentImg(Logo);
  };

  const handleAmountChange = (amount) => {
    handleSellAmount(amount);
  };

  useEffect(() => {
    getData();
    setCurrentImg(
      `https://assets.coincap.io/assets/icons/${coin.id.toLowerCase()}@2x.png`
    );
  }, []);

  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      {isLoading ? (
        <></>
      ) : (
        <>
          <TableCell component="th" scope="row" align="center">
            <img
              src={currentImg}
              onError={handleImageError}
              alt="Coin Image"
              style={{ height: "35px" }}
            />
          </TableCell>
          <TableCell align="center">{coinData.name}</TableCell>
          <TableCell align="center">{coin.id}</TableCell>
          <TableCell align="center">
            {formatter.format(coinData.quote.USD.price)}
          </TableCell>
          <TableCell align="center">{coin.value}</TableCell>
          <TableCell align="center">
            {formatter.format(coinData.quote.USD.price * coin.value)}
          </TableCell>
          <TableCell align="center">
            <SellModal
              formatter={formatter}
              coinPrice={coinData.quote.USD.price}
              coins={coin.value}
              coinName={coin.id}
              handleAmountChange={handleAmountChange}
            />
          </TableCell>
        </>
      )}
    </TableRow>
  );
}

export default PortfolioCard;
