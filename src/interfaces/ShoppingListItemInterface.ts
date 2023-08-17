export interface ShoppingListItem {
    id: number;
    name: string;
    quantity: number;
    completedat?: Date;
    createdat: Date;
    updatedat: Date;
  }