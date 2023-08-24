import React, { useState, useEffect } from "react";
import "./EditItemModal.css";

const EditItemModal = ({ onCloseModal, onUpdate, item }) => {
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (item) {
      setItemName(item.name);
      setQuantity(item.quantity);
    }
  }, [item]);

  const handleItemNameChange = (e) => {
    setItemName(e.target.value);
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name: itemName,
      quantity: Number(quantity),
    };

    console.log("Data:", data);

    const response = await fetch(`/api/items/${item.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      onUpdate();
      onCloseModal();
    } else {
      console.error("Failed to update item");
    }
  };

  return (
    <div className="modal">
      <div className="modal__overlay" onClick={onCloseModal}>
        <div className="modal__container" onClick={(e) => e.stopPropagation()}>
          <button
            className="modal__close-button"
            type="button"
            onClick={onCloseModal}
          ></button>
          <form className="modal__form" onSubmit={handleSubmit}>
            <h2 className="modal__form-title">Edit Item</h2>
            <label className="modal__input-label" htmlFor="name">
              Item name
            </label>
            <input
              className="modal__input"
              id="name"
              name="name"
              type="text"
              required
              value={itemName}
              onChange={handleItemNameChange}
            />
            <label className="modal__input-label" htmlFor="quantity">
              Quantity
            </label>
            <input
              className="modal__input"
              id="quantity"
              name="quantity"
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
            />
            <button
              className={
                itemName === ""
                  ? "modal__submit-button modal__submit-button_disabled"
                  : "modal__submit-button"
              }
              type="submit"
              disabled={itemName === ""}
            >
              Update Item
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditItemModal;
