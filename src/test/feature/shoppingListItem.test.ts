import pool from '../../db';
import request from 'supertest';
import app from '../../index'


it('should delete a shopping list item', async () => {
    // First, add a new item to the database
    const newItem = {
        name: 'Oranges',
        quantity: 4,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };

    const addRes = await request(app).post('/api/shopping-list/add').send(newItem);
    const itemId = addRes.body.id; // Assuming the ID is included in the response

    // Then, delete the item by ID
    const deleteRes = await request(app).delete(`/api/shopping-list/delete/${itemId}`);
    expect(deleteRes.status).toEqual(200); // Check for a successful response status

    // Query the database directly to ensure the item was deleted
    const result = await pool.query(`SELECT * FROM shopping_list_items WHERE id = $1`, [itemId]);
    expect(result.rows.length).toEqual(0); // Expect no matching rows since the item was deleted
});


describe('Add shopping list item', () => {
    afterAll(async () => {
        await pool.end(); // Close the connection after tests
    });

    it('should add a new shopping list item', async () => {
        const newItem = {
            name: 'Bananas',
            quantity: 5,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        const res = await request(app).post('/api/shopping-list/add').send(newItem);
        expect(res.body).toHaveProperty('name', newItem.name);
        expect(res.body).toHaveProperty('quantity', newItem.quantity);
        expect(res.body).toHaveProperty('createdat');
        expect(res.body).toHaveProperty('updatedat');
        expect(res.body).toHaveProperty('completedat'); // Assuming 'completedAt' is null or not set for new items

        const itemId = res.body.id; // Assuming the ID is included in the response
  
        // Query the specific item by ID
        const result = await pool.query(`SELECT * FROM shopping_list_items WHERE id = $1`, [itemId]);
        expect(result.rows.length).toEqual(1);
        expect(result.rows[0].name).toEqual(newItem.name);
    });
});







