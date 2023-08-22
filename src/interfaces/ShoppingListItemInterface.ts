export interface ShoppingListItem {
  id: number;
  name: string;
  quantity: number;
  completedat?: Date | null;
  createdat: Date;
  updatedat: Date;
}
