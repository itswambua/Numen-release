import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/lib/db';
import { Order } from '@/models/Order';

export async function GET(req: NextRequest) {
  const id = req.nextUrl.pathname.split('/').pop();

  if (!id) {
    return NextResponse.json({ error: 'Missing ID in URL' }, { status: 400 });
  }

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
