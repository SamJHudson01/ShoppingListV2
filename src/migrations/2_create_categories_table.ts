export const up = `
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

ALTER TABLE shopping_list_items ADD COLUMN category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE;
`;

export const down = `
ALTER TABLE shopping_list_items DROP COLUMN store_item_id;

DROP TABLE categories;
`;