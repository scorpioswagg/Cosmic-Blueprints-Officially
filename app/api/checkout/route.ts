import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-03-31.basil',
});

const REPORT_PRICES = {
  single: 2999, // $29.99
  double: 5499, // $54.99
  triple: 7999, // $79.99
  subscription: 1999, // $19.99/month
};

export async function POST(req: NextRequest) {
  try {
    const { items, reportType, customerId } = await req.json();
    
    // Handle subscription creation
    if (reportType === 'subscription') {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'subscription',
        line_items: [{
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Monthly Astro Insights',
              description: 'Monthly astrological reports and mini-readings',
            },
            unit_amount: REPORT_PRICES.subscription,
            recurring: {
              interval: 'month',
            },
          },
          quantity: 1,
        }],
        success_url: `${process.env.NEXT_PUBLIC_DOMAIN}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_DOMAIN}/checkout?canceled=true`,
        customer: customerId,
      });

      return NextResponse.json({ url: session.url });
    }

    // Handle one-time purchases
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: items.map((item: any) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
            description: item.description,
          },
          unit_amount: REPORT_PRICES[item.type as keyof typeof REPORT_PRICES],
        },
        quantity: 1,
      })),
      success_url: `${process.env.NEXT_PUBLIC_DOMAIN}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_DOMAIN}/checkout?canceled=true`,
      customer: customerId,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
