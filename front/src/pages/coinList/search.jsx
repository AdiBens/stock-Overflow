import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Card from "../../components/card/card";

function Search({ formatter }) {
  const [open, setOpen] = React.useState(false);
  const [singleCoin, setSingleCoin] = React.useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSearch = () => {
    handleOpen();
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      <div className="searchContainer">
        <SearchIcon className="searchIcon" onClick={handleSearch} />
        <input
          type="text"
          placeholder="Search By Symbol"
          className="search"
          vale={singleCoin}
          onKeyDown={handleKeyDown}
          onChange={(e) => {
            setSingleCoin(e.target.value.toUpperCase());
          }}
        />
      </div>
      <div>
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
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "20px",
            }}
          >
            <span className="closeModal" onClick={handleClose}>
              <CloseIcon />
            </span>
            <Card coin={singleCoin} formatter={formatter} />
          </Box>
        </Modal>
      </div>
    </>
  );
}

export default Search;
