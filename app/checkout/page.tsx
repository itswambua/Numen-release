import { Suspense } from 'react';
import CheckoutPage from '@/components/ClientCheckoutPage'; // Move actual logic into this component

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center my-10">Loading checkout...</div>}>
      <CheckoutPage />
    </Suspense>
  );
}
