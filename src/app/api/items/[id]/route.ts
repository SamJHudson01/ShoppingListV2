import {
  deleteItem,
  updateItemCompletion,
  updateItem,
} from "../../../../models/shoppingListItemDAO"; // Adjust the path to your deleteItem function
import { NextResponse } from "next/server";

type UpdateRequestBody = {
  name?: string;
  quantity?: number;
  completed?: boolean;
  toggleCompleted?: boolean;
};

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
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
  const id = Number(params.id);
  const { name, quantity, completed, toggleCompleted } =
    (await request.json()) as UpdateRequestBody;

  try {
    let updatedItem;

    if (toggleCompleted) {
      updatedItem = await updateItemCompletion(id);
    } else {
      updatedItem = await updateItem(id, { name, quantity });
    }

    return new Response(JSON.stringify(updatedItem), { status: 200 });
  } catch (error) {
    console.error("Error updating item:", error);
    return new Response("Failed to update item", { status: 500 });
  }
}
