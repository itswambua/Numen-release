// >components>ClientCheckoutPage.tsx
'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import StripeUnifiedCheckout from "@/components/StripeUnifiedCheckout";



export default function CheckoutPage() {
          const { data: session, status } = useSession();
          const router = useRouter();
          const searchParams = useSearchParams();
          const isGuest = searchParams.get('guest') === 'true';
        
          const [formData, setFormData] = useState({
            name: '',
            email: '',
            address: '',
            city: '',
            state: '',
            zipCode: '',
            country: '',
          });
        
          type CartItem = {
            productId: string;
            title: string;
            quantity: number;
            price: number;
            format: string;
          };
        
          type Format = 'hardcover' | 'paperback' | 'ebook' | 'audiobook';
        
          const [cart, setCart] = useState<CartItem[]>([]);
          const [loading, setLoading] = useState<boolean>(false);
          const [error, setError] = useState<string>('');
        
          const rawFormat = searchParams.get('format') || 'hardcover';
          const format = rawFormat as Format;
          const quantity = parseInt(searchParams.get('quantity') || '1');
        
          useEffect(() => {
            const formatPrices: Record<Format, number> = {
              hardcover: 26.99,
              paperback: 19.99,
              ebook: 9.99,
              audiobook: 29.99,
            };
        
            setCart([
              {
                productId: 'book-001',
                title: 'The Numen of Banda',
                quantity,
                price: formatPrices[format],
                format,
              },
            ]);
          }, [format, quantity]);
        
          const isDigital = cart[0]?.format === 'ebook' || cart[0]?.format === 'audiobook';
          const shippingCost = isDigital ? 0 : 5;
        
          const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
          const total = (subtotal + shippingCost).toFixed(2);
        
          const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
            setFormData((prev) => ({
              ...prev,
              [name]: value,
            }));
          };
        
          const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            setError('');
        
            if (
              !formData.address ||
              !formData.city ||
              !formData.state ||
              !formData.zipCode ||
              !formData.country
            ) {
              setError('Please fill out all shipping fields');
              return;
            }
        
            if (isGuest && (!formData.name || !formData.email)) {
              setError('Name and email are required');
              return;
            }
        
            setLoading(true);
        
            try {
              const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  items: cart,
                  isGuest,
                  guestInfo: isGuest
                    ? {
                        name: formData.name,
                        email: formData.email,
                        shipping: {
                          address: formData.address,
                          city: formData.city,
                          state: formData.state,
                          zipCode: formData.zipCode,
                          country: formData.country,
                        },
                      }
                    : null,
                  shippingDetails: !isGuest
                    ? {
                        address: formData.address,
                        city: formData.city,
                        state: formData.state,
                        zipCode: formData.zipCode,
                        country: formData.country,
                      }
                    : null,
                }),
              });
        
              const data = await response.json();
        
              if (response.ok) {
                router.push(`/checkout/confirmation?orderId=${data.orderId}`);
              } else {
                setError(data.message || 'Checkout failed');
              }
            } catch (error) {
              setError('Something went wrong. Please try again.');
            } finally {
              setLoading(false);
            }
          };
        
          useEffect(() => {
            if (status === 'unauthenticated' && !isGuest) {
              router.push('/login');
            }
          }, [status, isGuest, router]);
        
          if (status === 'loading') {
            return <div className="text-center my-10">Loading...</div>;
          }
        
          return (
                    <div className="max-w-4xl mx-auto my-10 p-6">
                              <h1 className="text-3xl font-bold mb-6 text-center">Checkout</h1>

                              {isGuest && (
                                        <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded mb-6">
                                                  You are checking out as a guest. <Link href="/login" className="underline">Login</Link> if you have an account.
                                        </div>
                              )}

                              {error && (
                                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                                                  {error}
                                        </div>
                              )}

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div>
                                                  <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>

                                                  <form onSubmit={handleSubmit}>
                                                            {isGuest && (
                                                                      <>
                                                                                <div className="mb-4">
                                                                                          <label htmlFor="name" className="block text-gray-700 mb-2">Full Name</label>
                                                                                          <input
                                                                                                    type="text"
                                                                                                    id="name"
                                                                                                    name="name"
                                                                                                    value={formData.name}
                                                                                                    onChange={handleChange}
                                                                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                                                                                    required
                                                                                          />
                                                                                </div>

                                                                                <div className="mb-4">
                                                                                          <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
                                                                                          <input
                                                                                                    type="email"
                                                                                                    id="email"
                                                                                                    name="email"
                                                                                                    value={formData.email}
                                                                                                    onChange={handleChange}
                                                                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                                                                                    required
                                                                                          />
                                                                                </div>
                                                                      </>
                                                            )}

                                                            <div className="mb-4">
                                                                      <label htmlFor="address" className="block text-gray-700 mb-2">Address</label>
                                                                      <input
                                                                                type="text"
                                                                                id="address"
                                                                                name="address"
                                                                                value={formData.address}
                                                                                onChange={handleChange}
                                                                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                                                                required
                                                                      />
                                                            </div>

                                                            <div className="grid grid-cols-2 gap-4 mb-4">
                                                                      <div>
                                                                                <label htmlFor="city" className="block text-gray-700 mb-2">City</label>
                                                                                <input
                                                                                          type="text"
                                                                                          id="city"
                                                                                          name="city"
                                                                                          value={formData.city}
                                                                                          onChange={handleChange}
                                                                                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                                                                          required
                                                                                />
                                                                      </div>

                                                                      <div>
                                                                                <label htmlFor="state" className="block text-gray-700 mb-2">State/Province</label>
                                                                                <input
                                                                                          type="text"
                                                                                          id="state"
                                                                                          name="state"
                                                                                          value={formData.state}
                                                                                          onChange={handleChange}
                                                                                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                                                                          required
                                                                                />
                                                                      </div>
                                                            </div>

                                                            <div className="grid grid-cols-2 gap-4 mb-4">
                                                                      <div>
                                                                                <label htmlFor="zipCode" className="block text-gray-700 mb-2">Zip/Postal Code</label>
                                                                                <input
                                                                                          type="text"
                                                                                          id="zipCode"
                                                                                          name="zipCode"
                                                                                          value={formData.zipCode}
                                                                                          onChange={handleChange}
                                                                                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                                                                          required
                                                                                />
                                                                      </div>

                                                                      <div>
                                                                                <label htmlFor="country" className="block text-gray-700 mb-2">Country</label>
                                                                                <input
                                                                                          type="text"
                                                                                          id="country"
                                                                                          name="country"
                                                                                          value={formData.country}
                                                                                          onChange={handleChange}
                                                                                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                                                                          required
                                                                                />
                                                                      </div>
                                                            </div>

                                                            {/* Payment information  */}
                                                            <StripeUnifiedCheckout
                                                                      cart={cart}
                                                                      isGuest={isGuest}
                                                                      guestInfo={isGuest ? { name: formData.name, email: formData.email } : undefined}
                                                                      shippingDetails={{
                                                                                address: formData.address,
                                                                                city: formData.city,
                                                                                state: formData.state,
                                                                                zipCode: formData.zipCode,
                                                                                country: formData.country
                                                                      }}
                                                            />


                                                  </form>
                                        </div>

                                        <div>
                                                  <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

                                                  <div className="bg-gray-50 rounded-lg p-6">
                                                            {cart.map((item, index) => (
                                                                      <div key={index} className="flex justify-between mb-4 pb-4 border-b">
                                                                                <div>
                                                                                          <h3 className="font-medium">{item.title}</h3>
                                                                                          <p className="text-sm text-gray-600">Format: {item.format}</p>
                                                                                          <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                                                                                </div>
                                                                                <div className="text-right">
                                                                                          <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                                                                                </div>
                                                                      </div>
                                                            ))}

                                                            <div className="mt-4">
                                                                      <div className="flex justify-between mb-2">
                                                                                <span>Subtotal</span>
                                                                                <span>${subtotal}</span>
                                                                      </div>

                                                                      <div className="flex justify-between mb-2">
                                                                                <span>Shipping</span>
                                                                                <span>{shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}</span>
                                                                      </div>

                                                                      <div className="flex justify-between font-bold text-lg border-t pt-4 mt-4">
                                                                                <span>Total</span>
                                                                                <span>${total}</span>
                                                                      </div>
                                                            </div>
                                                  </div>
                                        </div>
                              </div>
                    </div>
          );
}