import React from 'react';
import './ShoppingListItem.css';
import { ShoppingListItem as ShoppingListItemProps } from '../../interfaces/ShoppingListItemInterface';

interface ShoppingListItemPropsWithDelete extends ShoppingListItemProps {
    onDelete: (id: number) => void;
    
}

function ShoppingListItem({
    id,
    name,
    quantity,
    completedat,
    createdat,
    updatedat,
    onDelete,
    
}: ShoppingListItemPropsWithDelete) {
    return (
        <div className="shopping-list-item">
            <p className="shopping-list-item__name">{name}</p>
            <p className="shopping-list-item__quantity">{quantity ? quantity.toString() : '0'}</p>
            <button
                className="shopping-list-item__delete-button"
                onClick={() => onDelete(id)} >
                Delete
            </button>
        </div>
    );
}

export default ShoppingListItem;
