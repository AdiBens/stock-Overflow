import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  textAlign: "center",
  color: "red",
};

export default function BasicModal() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="modal404">
      <Button onClick={handleOpen} variant="outlined">
        404?
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h3" component="h2">
            404
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2, fontWeight: "800", color: "blue" }}
          >
            Error 404 is a client-side issue indicating the requested URL can’t
            be found on the server. It may occur because of several reasons,
            such as the domain is not pointed correctly, a broken .htaccess
            file, or misconfigured file permissions.
          </Typography>
          <Button
            sx={{ marginTop: "30px" }}
            variant="contained"
            size="small"
            onClick={() => navigate("/")}
          >
            Home
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
