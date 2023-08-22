"use client";

import "./AddItemForm.css";

export default function AddItemForm({ onUpdate }) {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const input = e.target.querySelector("input");
    const value = input.value;
    if (!value) {
      return;
    }
    const data = { name: value };
    const response = await fetch("/api/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    input.value = "";
    onUpdate();
  };

  return (
    <form className="add-item-form" onSubmit={handleSubmit}>
      <input
        className="add-item-form__input"
        type="text"
        placeholder="Add Item"
      />
      <button className="add-item-form__button" type="submit">
        Add
      </button>
    </form>
  );
}
