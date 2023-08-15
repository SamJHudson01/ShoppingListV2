import pool from '../db';
import { ShoppingListItem } from '../../src/interfaces/ShoppingListItem';


export const getItems = async (): Promise<ShoppingListItem[]> => {
    const result = await pool.query(`SELECT * FROM shopping_list_items`);
    return result.rows;
};

export const addItem = async (item: Omit<ShoppingListItem, 'id' | 'completedAt'>): Promise<ShoppingListItem> => {
    const { name, quantity, createdAt, updatedAt } = item;
    const result = await pool.query(
      `INSERT INTO shopping_list_items (name, quantity, createdAt, updatedAt) VALUES ($1, $2, $3, $4) RETURNING *`,
      [name, quantity, createdAt, updatedAt]
    );
    return result.rows[0];
  };

  export const deleteItem = async (id: number): Promise<void> => {
    try {
      await pool.query(
        `DELETE FROM shopping_list_items WHERE id = $1`,
        [id]
      );
    } catch (error) {
      console.error('Error deleting item:', error);
      throw new Error('Failed to delete item'); // This will allow your Express error handler to catch the error
    }
  };
  
  
