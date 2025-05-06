'use client';

import { useEffect } from 'react';
import { useUserStore } from '@/store/user';
import { useTradeStore } from '@/store/trade';

function formatCurrency(cents: number | null): string {
  if (cents === null) return '$0.00';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(cents / 100);
}

export default function DashboardPage() {
  const balance = useUserStore((state) => state.balance);
  const { openPnl, closedPnl, openTrades, fetchOpenTrades, fetchPnl } = useTradeStore();

  useEffect(() => {
    fetchOpenTrades();
    fetchPnl();
  }, [fetchOpenTrades, fetchPnl]);

  const stats = [
    { name: 'Current Balance', value: formatCurrency(balance) },
    { name: 'Open P&L', value: formatCurrency(openPnl), color: openPnl && openPnl > 0 ? 'text-green-600' : 'text-red-600' },
    { name: 'Closed P&L', value: formatCurrency(closedPnl), color: closedPnl && closedPnl > 0 ? 'text-green-600' : 'text-red-600' },
    { name: 'Open Positions', value: openTrades?.length || 0 },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.name}
            className="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6"
          >
            <dt>
              <div className="absolute rounded-md bg-blue-500 p-3">
                <div className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500">{item.name}</p>
            </dt>
            <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
              <p className={`text-2xl font-semibold ${item.color || 'text-gray-900'}`}>
                {item.value}
              </p>
            </dd>
          </div>
        ))}
      </dl>

      {openTrades && openTrades.length > 0 && (
        <div className="mt-8">
          <h2 className="text-lg font-medium text-gray-900">Open Positions</h2>
          <div className="mt-4 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
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
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {openTrades.map((trade) => (
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
} 