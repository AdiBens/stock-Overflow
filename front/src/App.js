import React, { useEffect, useLayoutEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/mainnav";
import "./assets/App.css";
import "./assets/Fonts.css";
import Home from "./pages/home/home";
import Articles from "./pages/articles/articles";
import { useDispatch, useSelector } from "react-redux";
import LoginRegister from "./pages/loginRegister/login_Register";
import PageNotFound from "./pages/404/pagenotfound";
import { checkLogged } from "./context/userSlice";
import { fetchArticles } from "./context/articlesSlice";
import WatchList from "./pages/watchList/watchlist";
import CoinList from "./pages/coinList/coinlist";
import Portfolio from "./pages/portfolio/portfolio";
import { fetchHistory } from "./context/historySlice";
import DemoHome from "./pages/home/demoHome";

function App() {
  const [_id, set_id] = useState(
    JSON.parse(sessionStorage.getItem("_id")) || null
  );
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const isLoading = useSelector((state) => state.user.isLoading);
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  });

  useLayoutEffect(() => {
    dispatch(fetchArticles());
    dispatch(fetchHistory());
    if (_id) {
      dispatch(checkLogged());
    }
  }, []);

  useEffect(() => {
    dispatch(fetchHistory());
  }, [user]);

  if (isLoading) return <div className="loading"></div>;

  return (
    <>
      {user.isLogged ? (
        <div>
          <Header formatter={formatter} />
          <Routes>
            <Route path="/" element={<Home formatter={formatter} />} />
            {/* <Route path="/" element={<DemoHome formatter={formatter} />} /> */}
            <Route
              path="/portfolio"
              element={<Portfolio formatter={formatter} />}
            />
            <Route path="/articles" element={<Articles />} />
            <Route path="/coins" element={<CoinList formatter={formatter} />} />
            <Route
              path="/watchlist"
              element={<WatchList formatter={formatter} />}
            />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
      ) : (
        <Routes>
          <Route path="/*" element={<LoginRegister />} />
        </Routes>
      )}
    </>
  );
}

export default App;
