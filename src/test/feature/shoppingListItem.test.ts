import pool from '../../db';
import request from 'supertest';


describe('Database Insertion', () => {
     beforeAll(async () => {
        const text = `
        INSERT INTO shopping_list_items (name, quantity, completedAt, createdAt, updatedAt)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
        `;
    
        const currentDate = new Date().toISOString();
        const values = ['Apples', 3, null, currentDate, currentDate];
    
        await pool.query(text, values);
        
        
        })
  afterAll(async () => {
    await pool.end();  // Close the connection after tests
  });

  it('should retrieve all shopping list items', async () => {
    

    const res = await request(app).get('/api/shopping-list');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('data');
    expect(res.body.data).toHaveLength(1);
    expect(res.body.data[0]).toHaveProperty('name');
    expect(res.body.data[0]).toHaveProperty('quantity');
    expect(res.body.data[0]).toHaveProperty('completedAt');
    expect(res.body.data[0]).toHaveProperty('createdAt');
    expect(res.body.data[0]).toHaveProperty('updatedAt');
    
  });
});


  