import pool from "../db";
import { ShoppingListItem } from "../interfaces/ShoppingListItemInterface";

export const getItems = async (): Promise<ShoppingListItem[]> => {
  const result = await pool.query(`SELECT * FROM shopping_list_items`);
  return result.rows;
};

export const addItem = async (
  item: Omit<ShoppingListItem, "id" | "completedat">
): Promise<ShoppingListItem> => {
  const { name, quantity, createdat, updatedat } = item;
  const result = await pool.query(
    `INSERT INTO shopping_list_items (name, quantity, createdat, updatedat) VALUES ($1, $2, $3, $4) RETURNING *`,
    [name, quantity, createdat, updatedat]
  );
  return result.rows[0];
};

export const deleteItem = async (id: number): Promise<void> => {
  try {
    await pool.query(`DELETE FROM shopping_list_items WHERE id = $1`, [id]);
  } catch (error) {
    console.error("Error deleting item:", error);
    throw new Error("Failed to delete item"); // This will allow your Express error handler to catch the error
  }
};
export const updateItem = async (
  id: number,
  item: { name: string; quantity: number }
): Promise<ShoppingListItem> => {
  const { name, quantity } = item;
  const result = await pool.query(
    `UPDATE shopping_list_items SET name = $1, quantity = $2 WHERE id = $3 RETURNING *`,
    [name, quantity, id]
  );

  if (result.rows.length === 0) {
    throw new Error("Item not found"); // Or handle this case differently
  }

  return result.rows[0];
};

export const updateItemCompletion = async (
  id: number
): Promise<ShoppingListItem> => {
  const currentItem = await pool.query(
    `SELECT completedat FROM shopping_list_items WHERE id = $1`,
    [id]
  );

  if (currentItem.rows.length === 0) {
    throw new Error("Item not found");
  }

  let newCompletedAt: string | null;
  if (currentItem.rows[0].completedat) {
    newCompletedAt = null;
  } else {
    newCompletedAt = new Date().toISOString();
  }

  const result = await pool.query(
    `UPDATE shopping_list_items SET completedat = $1 WHERE id = $2 RETURNING *`,
    [newCompletedAt, id]
  );

  return result.rows[0];
};
