function HistoryBody({ action }) {
  return (
    <tr
      style={{
        backgroundColor:
          action.action == "buy" ? "rgb(107, 249, 107)" : "rgb(255, 126, 126)",
      }}
    >
      <td>{action.coinName}</td>
      <td>{action.amount}</td>
      <td>{action.price}</td>
      <td>{action.date}</td>
      <td>{action.action}</td>
    </tr>
  );
}

export default HistoryBody;
