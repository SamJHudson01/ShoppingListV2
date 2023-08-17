import React, { useState } from 'react'
import AddItemForm from '../AddItemForm/AddItemForm'
import './ShoppingList.css'
import ShoppingListItem from '../ShoppingListItem/ShoppingListItem'



function ShoppingList() {
   const [items, setItems] = useState([])
   


  return (
    <main className='shopping-list'>


      <AddItemForm />
  

      <div className="shopping-list__item-container">
        <ShoppingListItem name='Apples'
          quantity={5}
          createdat={new Date()}
          completedat={new Date()}
          updatedat={new Date()}
          id={1} />
      </div>

    </main>
  )
}

export default ShoppingList