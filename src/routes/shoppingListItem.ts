import express from 'express';
import { addItem, deleteItem, updateItem, getItems } from '../../src/models/shoppingListItemDAO';

const router = express.Router();

router.post('/add', async (req, res) => {
  try {
    const newItem = await addItem(req.body);
    res.status(201).json(newItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await deleteItem(id);
    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.put('/update/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { name, quantity } = req.body; // Get the new name and quantity from the request body
      const updatedItem = await updateItem(id, { name, quantity });
      res.status(200).json(updatedItem);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  router.get('/get', async (req, res) => {
    try {
      const items = await getItems();
      res.status(200).json(items);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
    );

export default router;
