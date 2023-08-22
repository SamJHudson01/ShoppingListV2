import React from "react";
import "./AddItemButton.css";
import addIcon from "../../images/Add-28px.svg";
import Image from "next/image";

const AddItemButton = ({ openModal }) => {
  return (
    <div className="add-item-button-container">
      <button className="add-item-button" onClick={openModal}>
        <Image
          className="add-item-button-add-icon"
          src={addIcon}
          alt="add icon"
        />
        <p className="add-item-button-button-text">Add Item</p>
      </button>
    </div>
  );
};

export default AddItemButton;
