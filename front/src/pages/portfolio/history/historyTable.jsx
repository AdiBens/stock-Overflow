import { useSelector } from "react-redux";
import HistoryBody from "./historyBody";
import { useState } from "react";

function HistoryTable() {
  const history = useSelector((state) => state.history.history);
  const [view, setView] = useState(history);

  const handleChangeView = (filter) => {
    switch (filter) {
      case "sell":
        const sell = history.filter((action) => {
          return action.action == "sell";
        });
        setView(sell);
        break;
      case "buy":
        const buy = history.filter((action) => {
          return action.action == "buy";
        });
        setView(buy);
        break;
      case "all":
        setView(history);
        break;
      default:
        setView(history);
    }
  };

  return (
    <>
      <div>
        Filter By:{" "}
        <span
          style={{ color: "green", cursor: "pointer" }}
          onClick={() => handleChangeView("buy")}
        >
          Buy /&nbsp;
        </span>
        <span
          style={{ color: "red", cursor: "pointer" }}
          onClick={() => handleChangeView("sell")}
        >
          Sell /&nbsp;
        </span>
        <span
          style={{ cursor: "pointer" }}
          onClick={() => handleChangeView("all")}
        >
          {" "}
          All{" "}
        </span>
      </div>
      <table className="historyTable">
        <thead>
          <tr>
            <th>Coin</th>
            <th>Amount</th>
            <th>Price</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {view.map((action, index) => (
            <HistoryBody action={action} key={index} />
          ))}
        </tbody>
      </table>
    </>
  );
}

export default HistoryTable;
