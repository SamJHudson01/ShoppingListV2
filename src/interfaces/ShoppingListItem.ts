export interface ShoppingListItem {
    id: number;
    name: string;
    quantity: number;
    completedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
  }