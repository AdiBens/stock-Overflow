import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import HistoryTable from "./historyTable";

function History() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button
        onClick={handleOpen}
        style={{
          cursor: "pointer",
          fontSize: "18px",
          marginBottom: "20px",
          fontWeight: "bolder",
        }}
      >
        Order History
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
            width: 900,
            height: 600,
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
          <Typography id="modal-modal-title" variant="h3" component="h2">
            History
          </Typography>
          <div
            className="historyContainer"
            style={{ overflow: "auto", padding: "20px" }}
          >
            <HistoryTable />
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default History;
