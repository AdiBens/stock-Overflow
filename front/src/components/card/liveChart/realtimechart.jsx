import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import Loading from "../../loading/loading";

const RealTimeChart = ({ coinData }) => {
  const symbol = coinData.symbol;
  const [data, setData] = useState(
    JSON.parse(localStorage.getItem(symbol)) || []
  );

  const getData = async () => {
    const res = await axios.get(
      `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${symbol}&tsyms=usd`
    );
    const result = res.data;
    const newData = [
      { time: new Date().toLocaleTimeString(), price: result[symbol]["USD"] },
      ...data,
    ];
    setData(newData);
    localStorage.setItem(symbol, JSON.stringify(newData));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getData();
    }, 2500);
    return () => {
      clearInterval(interval);
    };
  }, [data]);

  return data.length > 0 ? (
    <LineChart width={500} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="time" />
      <YAxis />
      <Tooltip />
      <Legend name="Chart" />
      <Line type="monotone" dataKey="price" stroke="#8884d8" />
    </LineChart>
  ) : (
    <Loading />
  );
};

export default RealTimeChart;
