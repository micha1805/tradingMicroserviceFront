'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useWireStore } from '@/store/wire';
import { useUserStore } from '@/store/user';
import type { WirePost } from '@/types/api';

function formatCurrency(cents: number | null): string {
  if (cents === null) return '$0.00';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(cents / 100);
}

export default function WirePage() {
  const [success, setSuccess] = useState<string | null>(null);
  const { createWire, loading, error } = useWireStore();
  const balance = useUserStore((state) => state.balance);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<{ amount: string }>();

  const onSubmit = async (data: { amount: string }) => {
    try {
      const amountInCents = Math.round(parseFloat(data.amount) * 100);
      await createWire({ amount_in_cent: amountInCents });
      setSuccess('Wire transfer completed successfully.');
      reset();
    } catch (err) {
      // Error will be handled by the store
    }
  };

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Wire Transfer</h1>
          <p className="mt-2 text-sm text-gray-700">
            Transfer funds to your trading account.
          </p>
        </div>
      </div>

      <div className="mt-6">
        <div className="overflow-hidden bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="mb-6">
              <h3 className="text-base font-semibold leading-6 text-gray-900">Current Balance</h3>
              <p className="mt-2 text-3xl font-bold text-gray-900">
                {formatCurrency(balance)}
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                  Amount (USD)
                </label>
                <div className="relative mt-1 rounded-md shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    step="0.01"
                    {...register('amount', {
                      required: 'Amount is required',
                      min: { value: 0.01, message: 'Amount must be greater than 0' },
                      pattern: {
                        value: /^\d+(\.\d{0,2})?$/,
                        message: 'Amount must be a valid number with up to 2 decimal places',
                      },
                    })}
                    className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder="0.00"
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <span className="text-gray-500 sm:text-sm">USD</span>
                  </div>
                </div>
                {errors.amount && (
                  <p className="mt-2 text-sm text-red-600">{errors.amount.message}</p>
                )}
              </div>

              {error && (
                <div className="rounded-md bg-red-50 p-4">
                  <div className="flex">
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800">{error}</h3>
                    </div>
                  </div>
                </div>
              )}

              {success && (
                <div className="rounded-md bg-green-50 p-4">
                  <div className="flex">
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-green-800">{success}</h3>
                    </div>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'Submit Wire Transfer'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 