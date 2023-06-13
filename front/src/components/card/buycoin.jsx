import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { buyCoin } from "../../context/userSlice";
import { newHistory } from "../../context/historySlice";

export default function BuyCoin({ coinData, formatter }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setAmount(0);
    return setOpen(false);
  };
  const userInfo = useSelector((state) => state.user.user[0]);
  const [amount, setAmount] = useState(0);
  const [amountPrice, setAmountPrice] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showMoneyError, setShowMoneyError] = useState(false);
  const [maxCoins, setMaxCoins] = useState(
    userInfo.balance / coinData.quote.USD.price
  );
  const dispactch = useDispatch();

  const calcAmount = () => {
    setAmountPrice(amount * coinData.quote.USD.price);
  };

  useEffect(() => {
    setMaxCoins(userInfo.balance / coinData.quote.USD.price);
  }, [userInfo]);

  const handleBuy = () => {
    if (amountPrice >= userInfo.balance || amountPrice == 0 || amount <= 0) {
      console.log("Not Enough money");
      setShowMoneyError(true);
      setTimeout(() => {
        setShowMoneyError(false);
      }, 3000);
    } else {
      dispactch(
        buyCoin({
          coinName: coinData.symbol,
          amount,
          currentBalance: (userInfo.balance - amountPrice).toString(),
        })
      );
      dispactch(
        newHistory({
          coinName: coinData.symbol,
          price: formatter.format(coinData.quote.USD.price),
          action: "buy",
          amount,
        })
      );
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    }
    setAmount("");
  };

  useEffect(() => {
    if (amount < 0) {
      setAmount("");
    }
    if (amount > maxCoins) {
      setAmount((maxCoins - 0.001).toFixed(3));
    }
    calcAmount();
  }, [amount]);

  return (
    <div>
      <Button
        variant="contained"
        onClick={handleOpen}
        style={{ width: "250px" }}
      >
        Buy <AttachMoneyIcon />
      </Button>
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
            height: 460,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: "20px",
          }}
        >
          <span className="closeModal" onClick={handleClose}>
            <CloseIcon />
          </span>
          <Typography
            id="modal-modal-title"
            variant="h3"
            component="h2"
            style={{
              color: "green",
              borderBottom: "3px solid green",
            }}
          >
            Buy
          </Typography>
          <div className="buyMain">
            <div className="topBuyAction">
              <div className="userBalance">
                Balance: &nbsp;{formatter.format(userInfo.balance)}
              </div>
              <div className="currentPrice">
                Current Price: &nbsp;
                {formatter.format(coinData.quote.USD.price)}
              </div>
            </div>
            <div className="bottomButAction">
              <div className="buyAction">
                <input
                  type="number"
                  placeholder="Amount"
                  min="0"
                  className="input"
                  value={amount || ""}
                  required
                  autoFocus
                  onChange={(e) => {
                    setAmount(e.target.value);
                  }}
                  style={{ fontSize: "16px" }}
                />
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleBuy}
                  style={{ height: "47px" }}
                  sx={{ borderRadius: "0 10px 10px 0 ", right: "20px" }}
                >
                  Buy
                </Button>
              </div>
              <div className="buySpans">
                <span className="totalPrice">
                  Max:{" "}
                  {(maxCoins - 0.001).toFixed(3) < 0.0001
                    ? "0"
                    : (maxCoins - 0.001).toFixed(3)}
                </span>
                <span className="totalPrice">
                  Total Price: {formatter.format(amountPrice)}
                </span>
              </div>
            </div>
            {showSuccess ? (
              <span className="successMessage ">Success</span>
            ) : (
              <></>
            )}
            {showMoneyError ? (
              <span className="errorMoneyMessage ">Not Enough Money</span>
            ) : (
              <></>
            )}
          </div>
        </Box>
      </Modal>
    </div>
  );
}
