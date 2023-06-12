import { useSelector } from "react-redux";
import Card from "../../components/card/card";

function WatchList({ formatter }) {
  const watchList = useSelector((state) => state.user.user[0].watchList);
  return (
    <div className="watchListPage">
      {watchList.length >= 1 ? (
        <>
          <h1 className="pageTitle">Watch List</h1>
          <div className="watchListMain">
            {watchList.map((coin) => {
              return (
                <Card
                  coin={coin}
                  formatter={formatter}
                  key={coin}
                  watchList={true}
                />
              );
            })}
          </div>
        </>
      ) : (
        <div>Make Sure To Have WatchList Coins</div>
      )}
    </div>
  );
}

export default WatchList;
