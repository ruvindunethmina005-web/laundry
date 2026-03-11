import React from 'react';
import { useTransactions } from '../../hooks/useTransactions';
import { Link } from 'react-router-dom';

export default function TransactionList() {
  const { transactions, loading } = useTransactions();

  if (loading) return <div className="text-center p-4">Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Transactions</h2>
        <div className="space-x-2">
          <Link to="/sales/new" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">New Sale</Link>
          <Link to="/expenses/new" className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">New Expense</Link>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {transactions.map((t) => (
              <tr key={t.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {t.date.toDate ? t.date.toDate().toLocaleDateString() : new Date(t.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    t.type === 'sale' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {t.type}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{t.description}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{t.vendorId || '-'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right font-medium">
                  ${t.total.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}