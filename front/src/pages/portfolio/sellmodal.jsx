import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import SellIcon from "@mui/icons-material/Sell";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import { sellCoin } from "../../context/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { newHistory } from "../../context/historySlice";

function SellModal({
  formatter,
  coinPrice,
  coins,
  coinName,
  handleAmountChange,
}) {
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
  const [showError, setShowError] = useState(false);
  const dispactch = useDispatch();

  const calcAmount = () => {
    setAmountPrice(amount * coinPrice);
  };

  const handleSell = () => {
    if (amount <= 0 || amount > coins) {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 1900);
      return;
    } else {
      dispactch(
        sellCoin({
          coinName,
          amount,
          currentBalance: (+userInfo.balance + amountPrice).toString(),
        })
      );
      dispactch(
        newHistory({
          coinName,
          price: formatter.format(coinPrice),
          action: "sell",
          amount,
        })
      );
      handleAmountChange(amountPrice);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
      }, 2000);
      setAmount("");
    }
  };

  useEffect(() => {
    if (amount > coins) {
      setAmount(coins);
    }
    if (amount < 0) {
      setAmount("");
    }
    calcAmount();
  }, [amount]);

  return (
    <div>
      <Button onClick={handleOpen} style={{ cursor: "pointer" }}>
        <SellIcon />
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
            width: 450,
            height: 300,
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
              color: "red",
              borderBottom: "3px solid red",
            }}
          >
            Sell
          </Typography>
          <div className="buyMain">
            <div className="topBuyAction">
              <div className="userBalance">
                Balance: &nbsp;{formatter.format(userInfo.balance)}
              </div>
              <div className="currentPrice">
                Current Price: &nbsp;
                {formatter.format(coinPrice)}
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
                  color="error"
                  style={{ height: "47px" }}
                  onClick={handleSell}
                  sx={{ borderRadius: "0 10px 10px 0 ", right: "20px" }}
                >
                  Sell
                </Button>
              </div>
              <div className="buySpans">
                <span className="totalPrice">Max: {coins}</span>
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
            {showError ? (
              <span className="errorMoneyMessage ">Error</span>
            ) : (
              <></>
            )}
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default SellModal;
