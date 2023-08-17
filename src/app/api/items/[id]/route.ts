import { deleteItem } from '../../../../models/shoppingListItemDAO'; // Adjust the path to your deleteItem function
import { NextResponse } from 'next/server';


export async function GET() {
    return NextResponse.json({ message: 'Test successful!' });
  }
  

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    console.log('trying to delete stuff and stuff')
    const id = params.id;
  
    try {
      await deleteItem(Number(id));
      return new Response(null, { status: 204 });
    } catch (error) {
      console.error('Error deleting item:', error);
      return new Response('Failed to delete item', { status: 500 });
    }
  }
  