import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import CloseIcon from "@mui/icons-material/Close";
import RealTimeChart from "./realtimechart";

export default function LiveChart({ coinData }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button
        variant="outlined"
        onClick={handleOpen}
        style={{ width: "250px" }}
      >
        Live Chart <TrendingUpIcon />
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
            width: 600,
            height: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "15px",
          }}
        >
          <span className="closeModal" onClick={handleClose}>
            <CloseIcon />
          </span>
          <Typography id="modal-modal-title" variant="h4" component="h2">
            Real Time Chart
          </Typography>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {coinData.symbol}
          </Typography>
          <RealTimeChart coinData={coinData} />
        </Box>
      </Modal>
    </div>
  );
}
