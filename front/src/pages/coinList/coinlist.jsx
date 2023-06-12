import { useEffect, useLayoutEffect, useState } from "react";
import Card from "../../components/card/card";
import axios from "axios";
import { Button } from "@mui/material";
import Loading from "../../components/loading/loading";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import Search from "./search";

function CoinList({ formatter }) {
  const [allCoins, setAllcoins] = useState([]);
  const [coinList, setCoinList] = useState([]);
  const [amount, setAmount] = useState(20);

  const getAllCoins = async () => {
    const { data } = await axios.get("http://localhost:3030/coinlistapi");
    setAllcoins(data);
    setCoinList(data.slice(0, amount));
  };

  const handleLoadMore = () => {
    if (amount < 1499) setAmount((oldV) => oldV + 20);
  };

  const handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop;
    const windowHeight = document.documentElement.clientHeight;
    const documentHeight = document.documentElement.offsetHeight;

    if (scrollTop + windowHeight >= documentHeight - 200) {
      handleLoadMore();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, [amount]);

  useLayoutEffect(() => {
    getAllCoins();
  }, []);

  useEffect(() => {
    setCoinList(allCoins.slice(0, amount));
  }, [amount]);

  return (
    <div className="coinsPage">
      {coinList.length >= 1 ? (
        <>
          <Search formatter={formatter} />
          <div className="coinPageMain">
            {coinList.map((coin) => {
              return (
                <Card formatter={formatter} coinList={coin} key={coin.symbol} />
              );
            })}
          </div>
          <Button
            variant="contained"
            style={{ marginBottom: "30px" }}
            onClick={handleLoadMore}
          >
            Load more
          </Button>

          <Button
            onClick={() => {
              window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
            }}
            variant="contained"
            style={{
              position: "fixed",
              padding: "0.25rem 0.5rem",
              fontSize: "12px",
              bottom: "40px",
              left: "40px",
              color: "#fff",
              textAlign: "center",
            }}
          >
            Top <ArrowUpwardIcon />
          </Button>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default CoinList;
