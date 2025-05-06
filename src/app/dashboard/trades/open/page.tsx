'use client';

import { useEffect } from 'react';
import { useTradeStore } from '@/store/trade';
import OpenTradeForm from '@/components/trade/OpenTradeForm';

function formatCurrency(cents: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(cents / 100);
}

export default function OpenTradesPage() {
  const { openTrades, closeTrade, fetchOpenTrades, loading, error } = useTradeStore();

  useEffect(() => {
    fetchOpenTrades();
  }, [fetchOpenTrades]);

  const handleCloseTrade = async (tradeId: string) => {
    await closeTrade(tradeId);
  };

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Open Trades</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all your currently open trading positions.
          </p>
        </div>
      </div>

      <div className="mt-6">
        <OpenTradeForm />
      </div>

      {error && (
        <div className="mt-6 rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">{error}</h3>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      Symbol
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Quantity
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Open Price
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Open Date
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {openTrades?.map((trade) => (
                    <tr key={trade.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {trade.symbol}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {trade.quantity}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {formatCurrency(trade.openPriceInCent)}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {new Date(trade.openDateTime).toLocaleDateString()}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <button
                          onClick={() => handleCloseTrade(trade.id.toString())}
                          disabled={loading}
                          className="text-blue-600 hover:text-blue-900 disabled:opacity-50"
                        >
                          Close Trade
                        </button>
                      </td>
                    </tr>
                  ))}
                  {(!openTrades || openTrades.length === 0) && (
                    <tr>
                      <td colSpan={5} className="py-4 text-center text-sm text-gray-500">
                        No open trades found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 