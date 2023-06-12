import React, { useState } from "react";
import Logo from "../../assets/logo.png";

const StockImg = ({ src }) => {
  const [currentImg, setCurrentImg] = useState(src);

  const handleImageError = () => {
    setCurrentImg(Logo);
  };

  return (
    <img
      className="coinImage"
      src={currentImg}
      onError={handleImageError}
      alt="Coin Image"
      style={{
        maxWidth: "64px",
        maxHeight: "64px",
        minHeight: "64px",
        minWidth: "64px",
      }}
    />
  );
};

export default StockImg;
