"use client";

import React, { useState, useEffect, Suspense } from "react";
import AddItemForm from "../AddItemForm/AddItemForm";
import "./ShoppingList.css";
import ShoppingListItem from "../ShoppingListItem/ShoppingListItem";
import AddItemButton from "../AddItemButton/AddItemButton";
import AddItemModal from "../AddItemModal/AddItemModal";
import { add } from "winston";
import EditItemModal from "../EditItemModal/EditItemModal";

function ShoppingList() {
  const [items, setItems] = useState([]);
  const [activeModal, setActiveModal] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const fetchItems = async () => {
    try {
      const response = await fetch("/api/items", { cache: "no-store" });
      const data = await response.json();
      setItems(data.sort((a, b) => b.id - a.id));
    } catch (error) {
      console.error("An error occurred while fetching the items:", error);
    }
  };

  const openAddItemModal = () => {
    setActiveModal("addItemModal");
  };

  const openEditModal = (item) => {
    setSelectedItem(item);
    setActiveModal("editItemModal");
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleDelete = async (id) => {
    const idString = id.toString();
    try {
      const response = await fetch(`/api/items/${idString}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete item");
      }
      console.log(response);
      fetchItems();
    } catch (error) {
      console.log("An error occurred when trying to delete this item:", error);
    }
  };

  return (
    <main className="shopping-list">
      <AddItemButton openModal={openAddItemModal} />
      {/* <AddItemForm onUpdate={fetchItems} /> */}
      <Suspense fallback={<div className="suspense">Loading the page... </div>}>
        <div className="shopping-list__item-container">
          {items.map((item) => (
            <ShoppingListItem
              key={item.id} // This is the added key prop
              name={item.name}
              quantity={item.quantity}
              createdat={new Date(item.createdat)}
              completedat={item.completedat ? new Date(item.completedat) : null}
              updatedat={new Date(item.updatedat)}
              id={item.id}
              onDelete={handleDelete}
              onUpdate={fetchItems}
              onEdit={openEditModal}
            />
          ))}
        </div>
      </Suspense>
      {activeModal == "addItemModal" && (
        <AddItemModal onCloseModal={closeModal} onUpdate={fetchItems} />
      )}
      {activeModal == "editItemModal" && (
        <EditItemModal
          onCloseModal={closeModal}
          onUpdate={fetchItems}
          item={selectedItem}
        />
      )}
    </main>
  );
}

export default ShoppingList;
