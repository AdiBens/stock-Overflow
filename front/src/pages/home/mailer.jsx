import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

function Mailer() {
  const user = useSelector((state) => state.user.user[0]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [mail, setMail] = useState({
    name: "",
    email: user.email,
    content: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleMailer = async () => {
    const { data } = await axios.post("http://localhost:3030/sendmail/api", {
      params: {
        mail,
      },
    });
    if (data == "sent") {
      setMail({
        name: "",
        email: user.email,
        content: "",
      });
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
      }, 1500);
    } else {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 1500);
    }
  };

  return (
    <div>
      <Button
        onClick={handleOpen}
        style={{
          textDecoration: "underline",
          backgroundColor: " rgb(245, 245, 104)",
          padding: "3px",
        }}
      >
        Contact
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          className="mailerModal"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <span className="closeModal" onClick={handleClose}>
            <CloseIcon />
          </span>
          <Typography
            id="modal-modal-title"
            variant="h4"
            component="h2"
            style={{
              textAlign: "center",
              marginBottom: "40px",
              textDecoration: "underline ",
            }}
          >
            Contact
          </Typography>
          <div className="formMailerContiner">
            <div className="mailerInputs">
              <input
                type="text"
                placeholder="Name"
                className="input"
                value={mail.name}
                onChange={(e) => {
                  setMail((oldVal) => {
                    return { ...oldVal, name: e.target.value };
                  });
                }}
              />
              <input
                type="email"
                placeholder="Email"
                className="input"
                value={mail.email}
                disabled
              />
            </div>
            <br />
            <textarea
              className="textArea "
              cols="35"
              rows="9"
              placeholder="Content"
              value={mail.content}
              onChange={(e) => {
                setMail((oldVal) => {
                  return { ...oldVal, content: e.target.value };
                });
              }}
            />

            <Button
              variant="contained"
              size="small"
              onClick={handleMailer}
              style={{ marginTop: "30px", width: "90px" }}
            >
              Send
            </Button>
          </div>
          {showSuccess ? <span className="successMessage ">Sent</span> : <></>}
          {showError ? <span className="errorMessage ">Error</span> : <></>}
        </Box>
      </Modal>
    </div>
  );
}

export default Mailer;
