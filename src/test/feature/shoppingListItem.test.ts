import pool from '../../db';
import request from 'supertest';
import app from '../../index'


it('should get all shopping list items', async () => {
    // Add two new items to the database
    const expectedItem1 = {
        name: "Apples",
        quantity: 3,
        createdat: new Date().toISOString(),
        updatedat: new Date().toISOString(),
      };
      
      const expectedItem2 = {
        name: "Pears",
        quantity: 5,
        createdat: new Date().toISOString(),
        updatedat: new Date().toISOString(),
      };
    

    await request(app).post('/api/shopping-list/add').send(expectedItem1);
    await request(app).post('/api/shopping-list/add').send(expectedItem2);

    // Fetch all items
    const getRes = await request(app).get('/api/shopping-list/get');
    console.log(getRes.body);
    expect(getRes.status).toEqual(200);

    // Check that the two items exist in the response
    const items = getRes.body;
    expect(items).toEqual(expect.arrayContaining([
        expect.objectContaining(expectedItem1), 
        expect.objectContaining(expectedItem2)
      ]));
});
it('should delete a shopping list item', async () => {
    // First, add a new item to the database
    const newItem = {
        name: 'Oranges',
        quantity: 4,
        createdat: new Date().toISOString(),
        updatedat: new Date().toISOString(),
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

it('should update a shopping list item', async () => {
    // First, add a new item to the database
    const newItem = {
        name: 'Apples',
        quantity: 3,
        createdat: new Date().toISOString(),
        updatedat: new Date().toISOString(),
    };

    const addRes = await request(app).post('/api/shopping-list/add').send(newItem);
    const itemId = addRes.body.id; // Assuming the ID is included in the response

    // Then, update the item by ID
    const updatedItem = {
        name: 'Green Apples',
        quantity: 5,
    };
    const updateRes = await request(app).put(`/api/shopping-list/update/${itemId}`).send(updatedItem);
    expect(updateRes.status).toEqual(200); // Check for a successful response status
    expect(updateRes.body.name).toEqual(updatedItem.name); // Check for updated name
    expect(updateRes.body.quantity).toEqual(updatedItem.quantity); // Check for updated quantity

    // Query the database directly to ensure the item was updated
    const result = await pool.query(`SELECT * FROM shopping_list_items WHERE id = $1`, [itemId]);
    expect(result.rows.length).toEqual(1); // Expect exactly one matching row
    expect(result.rows[0].name).toEqual(updatedItem.name); // Expect updated name in the database
    expect(result.rows[0].quantity).toEqual(updatedItem.quantity); // Expect updated quantity in the database
});



describe('Add shopping list item', () => {
    afterAll(async () => {
        await pool.end(); // Close the connection after tests
    });

    it('should add a new shopping list item', async () => {
        const newItem = {
            name: 'Bananas',
            quantity: 5,
            createdat: new Date().toISOString(),
            updatedat: new Date().toISOString(),
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







