'use client'

import React from 'react';
import './ShoppingListItem.css'
import { ShoppingListItem as ShoppingListItemProps } from '../../interfaces/ShoppingListItemInterface';

function ShoppingListItem({
  id,
  name,
  quantity,
  completedat,
  createdat,
  updatedat,
}: ShoppingListItemProps) {
  return (
    <div className="shopping-list-item">
      <p className="shopping-list-item__name">{name}</p>
      <p className="shopping-list-item__quantity">{quantity ? quantity.toString() : '0'}</p>
    </div>
  );
}

export default ShoppingListItem;
