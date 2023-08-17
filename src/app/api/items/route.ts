import { NextResponse } from "next/server"
import { getItems, addItem, deleteItem } from "../../../models/shoppingListItemDAO"
import { ShoppingListItem } from "../../../interfaces/ShoppingListItemInterface";

type NewShoppingListItem = Omit<ShoppingListItem, "id" | "completedat">

export const GET = async (request) => {
    const allItems = await getItems()

    return new NextResponse(JSON.stringify(allItems))
}

export const POST = async (request) => {
    const { name: itemName } = await request.json() // Read the name from the request body
    const newItem: NewShoppingListItem = {
        name: itemName,
        quantity: 1, 
        createdat: new Date(),
        updatedat: new Date(),
    };

    const addedItem = await addItem(newItem)

    return new NextResponse(JSON.stringify(addedItem))
}

export const DEL = async (request) => {
    const { id } = request.query; // Read the ID from the query parameters
  
    try {
      await deleteItem(Number(id)); // Make sure to convert the ID to a number
      return new NextResponse('Item deleted successfully'); // Send a success response
    } catch (error) {
      console.error('Error deleting item:', error);
      return new NextResponse('Failed to delete item', { status: 500 }); // Send an error response
    }
  };
  