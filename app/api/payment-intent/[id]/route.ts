import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_KEY_SECRET!);

export async function GET(request: NextRequest) {
  const id = request.nextUrl.pathname.split('/').pop();

  if (!id) {
    return NextResponse.json({ error: 'Missing payment intent ID' }, { status: 400 });
  }

  try {
    const intent = await stripe.paymentIntents.retrieve(id);
    return NextResponse.json({ intent });
  } catch (error) {
    console.error('[STRIPE_PAYMENT_INTENT_GET]', error);
    return NextResponse.json({ error: 'Unable to retrieve payment intent' }, { status: 500 });
  }
}
