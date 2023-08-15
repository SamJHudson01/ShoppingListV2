import pool from './db';

describe('Database Insertion', () => {
  afterAll(async () => {
    await pool.end();  // Close the connection after tests
  });

  it('should insert a record into the table', async () => {
    const text = `
    INSERT INTO shopping_list_items (name, quantity, completedAt, createdAt, updatedAt)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
    `;

    const currentDate = new Date().toISOString();
    const values = ['Apples', 3, null, currentDate, currentDate];

    const response = await pool.query(text, values);
    const record = response.rows[0];
    console.log(record)

    expect(record.name).toBe('Apples');
    expect(record.quantity).toBe(3);
  });
});