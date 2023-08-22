import React, { useState } from "react";
import "./AddItemModal.css";

const AddItemModal = ({ onCloseModal, onUpdate }) => {
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleItemNameChange = (e) => {
    setItemName(e.target.value);
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
    console.log("Quantity:", quantity);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const input = e.target.querySelector("input");
    const quantityValue = Number(
      e.target.querySelector("input[type=number]").value
    );
    const inputValue = input.value;
    if (!inputValue) {
      return;
    }
    const data = { name: inputValue, quantity: quantityValue };
    console.log("Data:", data);
    const response = await fetch("/api/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log("Result:", result);
    input.value = "";
    onUpdate();
    onCloseModal();
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
            <h2 className="modal__form-title">Add Item</h2>
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
            <label className="modal__input-label" htmlFor="category">
              Category
            </label>
            <select className="modal__input" id="category" name="category">
              <option value="Electronics">Electronics</option>
              <option value="Groceries">Groceries</option>
              <option value="Clothing">Clothing</option>
            </select>
            <button
              className={
                itemName === ""
                  ? "modal__submit-button modal__submit-button_disabled"
                  : "modal__submit-button"
              }
              type="submit"
              disabled={itemName === ""}
            >
              {" "}
              Add Item{" "}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddItemModal;
