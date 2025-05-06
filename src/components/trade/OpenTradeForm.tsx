'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTradeStore } from '@/store/trade';
import type { TradePost } from '@/types/api';

export default function OpenTradeForm() {
  const [error, setError] = useState<string | null>(null);
  const createTrade = useTradeStore((state) => state.createTrade);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<TradePost>();

  const onSubmit = async (data: TradePost) => {
    try {
      await createTrade(data);
      reset();
      setError(null);
    } catch (err) {
      setError('Failed to create trade. Please try again.');
    }
  };

  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Open New Trade</h3>
        <div className="mt-2 max-w-xl text-sm text-gray-500">
          <p>Enter the symbol and quantity to open a new trade position.</p>
        </div>
        <form className="mt-5 sm:flex sm:items-end" onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full sm:max-w-xs">
            <label htmlFor="symbol" className="block text-sm font-medium text-gray-700">
              Symbol
            </label>
            <input
              type="text"
              {...register('symbol', { required: 'Symbol is required' })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="e.g., AAPL"
            />
            {errors.symbol && (
              <p className="mt-1 text-sm text-red-600">{errors.symbol.message}</p>
            )}
          </div>
          <div className="mt-3 w-full sm:mt-0 sm:ml-4 sm:max-w-xs">
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
              Quantity
            </label>
            <input
              type="number"
              {...register('quantity', {
                required: 'Quantity is required',
                min: { value: 1, message: 'Quantity must be at least 1' },
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="100"
            />
            {errors.quantity && (
              <p className="mt-1 text-sm text-red-600">{errors.quantity.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="mt-3 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Open Trade
          </button>
        </form>
        {error && (
          <div className="mt-2 text-sm text-red-600">
            {error}
          </div>
        )}
      </div>
    </div>
  );
} 