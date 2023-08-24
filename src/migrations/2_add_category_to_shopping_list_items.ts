export const up = `
ALTER TABLE shopping_list_items
ADD COLUMN category VARCHAR(255) NULL;

ALTER TABLE shopping_list_items
ALTER COLUMN updatedAt SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN updatedAt SET ON UPDATE CURRENT_TIMESTAMP;
`;

export const down = `
ALTER TABLE shopping_list_items
DROP COLUMN category;

ALTER TABLE shopping_list_items
ALTER COLUMN updatedAt DROP DEFAULT;
`;
