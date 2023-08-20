import { NextResponse } from "next/server"
import { getItems, addItem, deleteItem } from "../../../models/shoppingListItemDAO"
import { ShoppingListItem } from "../../../interfaces/ShoppingListItemInterface";

type NewShoppingListItem = Omit<ShoppingListItem, "id" | "completedat">

export const GET = async (request) => {
    const allItems = await getItems()

    return new NextResponse(JSON.stringify(allItems))
}

export const POST = async (request) => {
    const { name: itemName } = await request.json()
    const newItem: NewShoppingListItem = {
        name: itemName,
        quantity: 1,
        createdat: new Date(),
        updatedat: new Date(),
    };

    const addedItem = await addItem(newItem)

    return new NextResponse(JSON.stringify(addedItem))
}

