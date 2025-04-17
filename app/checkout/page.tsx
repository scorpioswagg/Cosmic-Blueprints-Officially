'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function Checkout() {
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const canceled = searchParams.get('canceled');

  const handleCheckout = async (type: 'single' | 'double' | 'triple' | 'subscription') => {
    try {
      setLoading(true);
      
      let items;
      if (type === 'subscription') {
        const response = await fetch('/api/checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            reportType: 'subscription'
          }),
        });
        
        const { url } = await response.json();
        window.location.href = url;
        return;
      }

      // Handle one-time purchases
      switch (type) {
        case 'single':
          items = [{
            name: 'Single Report',
            description: 'One detailed astrological report of your choice',
            type: 'single'
          }];
          break;
        case 'double':
          items = [{
            name: 'Two Reports Bundle',
            description: 'Choose any two detailed astrological reports',
            type: 'double'
          }];
          break;
        case 'triple':
          items = [{
            name: 'Three Reports Bundle',
            description: 'Choose any three detailed astrological reports',
            type: 'triple'
          }];
          break;
      }

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      });

      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error('Checkout error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {canceled && (
          <div className="mb-8 p-4 bg-red-900/50 rounded-lg">
            Payment was canceled. Please try again.
          </div>
        )}
        
        <h1 className="text-4xl font-bold mb-8 text-center">Choose Your Package</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Single Report */}
          <div className="bg-gray-800 rounded-lg p-6 flex flex-col">
            <h2 className="text-xl font-semibold mb-2">Single Report</h2>
            <p className="text-gray-400 mb-4 flex-grow">
              One detailed astrological report of your choice
            </p>
            <div className="text-3xl font-bold text-purple-400 mb-4">$29.99</div>
            <button
              onClick={() => handleCheckout('single')}
              disabled={loading}
              className="w-full py-2 bg-purple-600 hover:bg-purple-700 rounded-md transition-colors disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Buy Now'}
            </button>
          </div>

          {/* Two Reports Bundle */}
          <div className="bg-gray-800 rounded-lg p-6 flex flex-col">
            <h2 className="text-xl font-semibold mb-2">Two Reports Bundle</h2>
            <p className="text-gray-400 mb-4 flex-grow">
              Choose any two detailed astrological reports
            </p>
            <div className="text-3xl font-bold text-purple-400 mb-4">$54.99</div>
            <button
              onClick={() => handleCheckout('double')}
              disabled={loading}
              className="w-full py-2 bg-purple-600 hover:bg-purple-700 rounded-md transition-colors disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Buy Now'}
            </button>
          </div>

          {/* Three Reports Bundle */}
          <div className="bg-gray-800 rounded-lg p-6 flex flex-col border-2 border-purple-500">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-purple-500 px-4 py-1 rounded-full text-sm">
              Best Value
            </div>
            <h2 className="text-xl font-semibold mb-2">Three Reports Bundle</h2>
            <p className="text-gray-400 mb-4 flex-grow">
              Choose any three detailed astrological reports
            </p>
            <div className="text-3xl font-bold text-purple-400 mb-4">$79.99</div>
            <button
              onClick={() => handleCheckout('triple')}
              disabled={loading}
              className="w-full py-2 bg-purple-600 hover:bg-purple-700 rounded-md transition-colors disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Buy Now'}
            </button>
          </div>

          {/* Monthly Subscription */}
          <div className="bg-gray-800 rounded-lg p-6 flex flex-col">
            <h2 className="text-xl font-semibold mb-2">Monthly Insights</h2>
            <p className="text-gray-400 mb-4 flex-grow">
              Regular astrological guidance and monthly mini-reports
            </p>
            <div className="text-3xl font-bold text-purple-400 mb-4">
              $19.99<span className="text-lg font-normal">/month</span>
            </div>
            <button
              onClick={() => handleCheckout('subscription')}
              disabled={loading}
              className="w-full py-2 bg-purple-600 hover:bg-purple-700 rounded-md transition-colors disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Subscribe Now'}
            </button>
          </div>
        </div>

        <div className="mt-12 text-center text-gray-400">
          <p className="mb-2">🔒 Secure payment powered by Stripe</p>
          <p className="text-sm">
            Your satisfaction is guaranteed. If you're not happy with your report,
            we'll provide a full refund within 30 days.
          </p>
        </div>
      </div>
    </div>
  );
}
