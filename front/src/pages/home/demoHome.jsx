import Card from "../../components/card/card";
import { useState } from "react";
import { useSelector } from "react-redux";
import Article from "../articles/articlePage";
import Mailer from "./mailer";
import BackGroundParticles from "../../components/particles/BackGroundParticles";

function DemoHome({ formatter }) {
  const [mainCoins, setMainCoins] = useState(["ETH", "BTC", , "BNB"]);
  const data = useSelector((state) => state.articles.articles);

  return (
    <>
      <BackGroundParticles className="important" />
      <div className="homePage">
        <h1 className="pageTitle">Stock Overflow</h1>
        <div className="mainCardsContainer">
          <h2 className="sevenDaysVolume"> 7 Days Change</h2>
          <div className="cardsContainer">
            {mainCoins.map((coin) => (
              <Card key={coin} mainCoin={coin} formatter={formatter} />
            ))}
          </div>
          <div className="latestArticle">
            {data.length > 0 && <Article articles={[data[0]]} />}
          </div>
        </div>
        <div className="footer">
          <Mailer />
          <p>In case you want to become writer click on Contact.</p>
        </div>
      </div>
    </>
  );
}

export default DemoHome;
