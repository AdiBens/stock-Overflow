import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Input from "@mui/material/Input";
import Radio from "@mui/material/Radio";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { addNewArticle } from "../../context/articlesSlice";
import { useState } from "react";

export default function CreateNewArticle() {
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setError(false);
  };
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [newArticle, setNewArticle] = useState({
    title: "",
    content: "",
    creator: user.user[0].name,
  });
  const [category, setCategory] = useState("Coins Update");

  const handleChange = (event) => {
    setCategory(event.target.value); // Update the selected category
  };
  const handleCreate = () => {
    if (newArticle.title && newArticle.content) {
      dispatch(addNewArticle({ ...newArticle, category }));
      setNewArticle({
        title: "",
        content: "",
      });
      setOpen(false);
      setError(false);
    } else {
      setError(true);
    }
  };
  return (
    <div className="createNewArticleContainer">
      <Button variant="contained" size="small" onClick={handleOpen}>
        New Article
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="modal"
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
            boxShadow: 24,
            p: 4,
          }}
        >
          <span className="closeModal" onClick={handleClose}>
            <CloseIcon />
          </span>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            style={{ textDecoration: "underline", textAlign: "center" }}
          >
            New Article
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2 }}
            component={"span"}
          >
            <form className="createForm">
              <div className="inputs">
                <Input
                  type="text"
                  placeholder="Title"
                  inputProps={{ maxLength: 40 }}
                  value={newArticle.title}
                  onInput={(e) =>
                    setNewArticle((oldVal) => {
                      return { ...oldVal, title: e.target.value };
                    })
                  }
                />
                <Input
                  type="text"
                  placeholder={new Date().toString()}
                  disabled
                />
              </div>
              <textarea
                className="textArea "
                cols="35"
                rows="9"
                value={newArticle.content}
                placeholder="Content"
                onInput={(e) =>
                  setNewArticle((oldVal) => {
                    return { ...oldVal, content: e.target.value };
                  })
                }
              />
              <div className="radioContainer">
                <h4 className="categoryTitle">Category:</h4>
                <label className="radioBoxLabel">
                  <Radio
                    value="News"
                    checked={category === "News"}
                    onChange={handleChange}
                  />
                  News
                </label>
                <label className="radioBoxLabel">
                  <Radio
                    value="Coins Update"
                    checked={category === "Coins Update"}
                    onChange={handleChange}
                  />
                  Coins Update
                </label>
                <label className="radioBoxLabel">
                  <Radio
                    value="Site Info"
                    checked={category === "Site Info"}
                    onChange={handleChange}
                  />
                  Site Info
                </label>
              </div>
              <Button variant="outlined" size="small" onClick={handleCreate}>
                Create
              </Button>
              {error ? (
                <span className={error ? "createError" : "hide"}>
                  Make Sure To Fill All Inputs
                </span>
              ) : (
                ""
              )}
            </form>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
