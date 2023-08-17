'use client'

import React, { useState, useEffect } from 'react'
import AddItemForm from '../AddItemForm/AddItemForm'
import './ShoppingList.css'
import ShoppingListItem from '../ShoppingListItem/ShoppingListItem'



function ShoppingList() {
  const [items, setItems] = useState([])

  const fetchItems = async () => {
    try {
      const response = await fetch('/api/items');
      const data = await response.json();
      setItems(data);
      console.log(data);
    } catch (error) {
      console.error('An error occurred while fetching the items:', error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [items]); 

  return (
    <main className='shopping-list'>


      <AddItemForm />


      <div className="shopping-list__item-container">
        {items.map(item => (
          <ShoppingListItem
            key={item.id} // This is the added key prop
            name={item.name}
            quantity={item.quantity}
            createdat={new Date(item.createdat)}
            completedat={new Date(item.completedat)}
            updatedat={new Date(item.updatedat)}
            id={item.id}
          />
        ))}
      </div>


    </main>
  )
}

export default ShoppingList