import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../loading/loading";
import CardModal from "./cardmodal";
import { useDispatch } from "react-redux";
import { removeFromList } from "../../context/userSlice";
import StockImg from "../UI/StockImg";

function Card(props) {
  const [coinData, setCoinData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [currentImg, setCurrentImg] = useState(null);
  const [error, setError] = useState(false);
  const coin = props.mainCoin || props.coin;
  const watchList = props.watchList;
  const dispactch = useDispatch();
  const coinList = props.coinList || false;

  const getData = async () => {
    const { data } = await axios.get("http://localhost:3030/singlecoinapi", {
      params: {
        symbol: coin,
      },
    });
    if (data.data == "error") {
      alert("Something Went Wrong");
      setLoading(false);
      setError(true);
      return;
    }
    if (!data.data[coin]) {
      setLoading(false);
      setError(true);
      return;
    }
    setCoinData(data.data[coin]);
    setLoading(false);
  };

  useEffect(() => {
    if (coinList) {
      setCurrentImg(
        `https://assets.coincap.io/assets/icons/${coinList.symbol.toLowerCase()}@2x.png`
      );
      setCoinData(coinList);
      setLoading(false);
    } else {
      setCurrentImg(
        `https://assets.coincap.io/assets/icons/${coin.toLowerCase()}@2x.png`
      );
      if (coin) {
        getData();
      }
    }
  }, []);

  return (
    <div className="card">
      {isLoading ? (
        <Loading />
      ) : error ? (
        <h1 className="coinError">
          Invalid-Symbol <br />
          {coin}
        </h1>
      ) : (
        <div className="coinCard">
          {watchList ? (
            <span
              className="editDelete deleteFromWatch"
              style={{ zIndex: "10" }}
              onClick={() => {
                dispactch(removeFromList(coin));
              }}
            >
              X
            </span>
          ) : (
            ""
          )}
          <StockImg src={currentImg} />
          <h3 className="coinName">{coinData.name}</h3>
          <h6>{coinData.symbol}</h6>
          <p>{props.formatter.format(coinData.quote.USD.price)}</p>
          <p
            style={{
              color:
                coinData.quote.USD.percent_change_7d.toFixed(1) >= 0
                  ? "green"
                  : "red",
            }}
          >
            {coinData.quote.USD.percent_change_7d.toFixed(1)}%
          </p>
          <CardModal
            coinData={coinData}
            coinImg={currentImg}
            formatter={props.formatter}
          />
        </div>
      )}
    </div>
  );
}

export default Card;
