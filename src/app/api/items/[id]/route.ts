import {
  deleteItem,
  updateItemCompletion,
} from "../../../../models/shoppingListItemDAO"; // Adjust the path to your deleteItem function
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  console.log("trying to delete stuff and stuff");
  const id = params.id;
  try {
    await deleteItem(Number(id));
    return new Response(null, { status: 204 });
  } catch (error) {
    console.error("Error deleting item:", error);
    return new Response("Failed to delete item", { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  console.log("trying to update stuff and stuff");
  const id = Number(params.id);
  try {
    const updatedItem = await updateItemCompletion(id);
    return new Response(JSON.stringify(updatedItem), { status: 200 });
  } catch (error) {
    console.error("Error updating item completion:", error);
    return new Response("Failed to update item completion", { status: 500 });
  }
}
