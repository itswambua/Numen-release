import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/lib/db';
import { Order } from '@/models/Order';

export async function GET(
  req: NextRequest,
  context: { params: Record<string, string> } // <- fix this line
) {
  const { id } = context.params;

  try {
    await connectToDB();
    const order = await Order.findOne({ stripeIntentId: id }).lean();

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json({ order });
  } catch (err) {
    console.error('[ORDER_LOOKUP_FAILED]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
