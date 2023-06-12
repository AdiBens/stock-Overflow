import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import StarIcon from "@mui/icons-material/Star";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { addToWatchList } from "../../context/userSlice";
import LiveChart from "./liveChart/livechart";
import BuyCoin from "./buycoin";

export default function CardModal({ coinData, coinImg, formatter }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [showAdded, setShowAdded] = React.useState(false);
  const supply = formatter.format(coinData.max_supply).substring(1);
  const dispactch = useDispatch();
  const watchListArr = useSelector((state) => state.user.user[0].watchList);

  const handleAddToWatchList = (coin) => {
    setShowAdded(true);
    setTimeout(() => {
      setShowAdded(false);
    }, 1500);
    const index = watchListArr.indexOf(coin);
    if (index == -1) {
      dispactch(addToWatchList(coin));
    }
  };

  return (
    <div>
      <Button
        onClick={handleOpen}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
        }}
      ></Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            borderRadius: "20px",
            display: "flex",
            flexDirection: "column",
            boxShadow: 24,
            p: 4,
          }}
        >
          <span className="closeModal" onClick={handleClose}>
            <CloseIcon />
          </span>
          <div className="cardModalTitle">
            <img src={coinImg} alt="Coin Img" className="cardModalImg" />
            <Typography id="modal-modal-title" variant="h4" component="h2">
              {coinData.name}
            </Typography>
            <img src={coinImg} alt="Coin Img" className="cardModalImg" />
          </div>
          <div className="cardModalMain">
            <div className="modalColumn">
              <div className="modalRow">
                <div className="cardSpan">Max supply:</div>
                <div className="cardText">{supply <= 0 ? "∞" : supply}</div>
              </div>
              <div className="modalRow">
                <div className="cardSpan cardSpanEnd">price:</div>
                <div className="cardText">
                  {formatter.format(coinData.quote.USD.price) || "-"}
                </div>
              </div>
            </div>
            <div className="modalColumn">
              <div className="modalRow">
                <div className="cardSpan">1H Change</div>
                <div
                  className="cardText"
                  style={{
                    color:
                      coinData.quote.USD.percent_change_1h.toFixed(2) >= 0
                        ? "green"
                        : "red",
                  }}
                >
                  {coinData.quote.USD.percent_change_1h.toFixed(2)}%
                </div>
              </div>
              <div className="modalRow cardSpanEnd">
                <div className="cardSpan">24H Change:</div>
                <div
                  className="cardText"
                  style={{
                    color:
                      coinData.quote.USD.percent_change_24h.toFixed(2) >= 0
                        ? "green"
                        : "red",
                  }}
                >
                  {coinData.quote.USD.percent_change_24h.toFixed(2)}%
                </div>
              </div>
            </div>
            <div className="modalColumn">
              <div className="modalRow">
                <div className="cardSpan">7D Change</div>
                <div
                  className="cardText"
                  style={{
                    color:
                      coinData.quote.USD.percent_change_7d.toFixed(2) >= 0
                        ? "green"
                        : "red",
                  }}
                >
                  {coinData.quote.USD.percent_change_7d.toFixed(2)}%
                </div>
              </div>
              <div className="modalRow cardSpanEnd">
                <div className="cardSpan">30D Change:</div>
                <div
                  className="cardText"
                  style={{
                    color:
                      coinData.quote.USD.percent_change_30d.toFixed(2) >= 0
                        ? "green"
                        : "red",
                  }}
                >
                  {coinData.quote.USD.percent_change_30d.toFixed(2)}%
                </div>
              </div>
            </div>
          </div>
          <div className="cardButtons">
            <Button
              variant="outlined"
              onClick={() => handleAddToWatchList(coinData.symbol)}
            >
              Add To Watch List
              <StarIcon fontSize="medium" className="addToWatchList" />
            </Button>
            <LiveChart coinData={coinData} />
            <BuyCoin coinData={coinData} formatter={formatter} />
          </div>

          {showAdded ? (
            <div className="addedMessage">Added To Watch List</div>
          ) : (
            <></>
          )}
        </Box>
      </Modal>
    </div>
  );
}
