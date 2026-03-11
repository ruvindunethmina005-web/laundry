import React from 'react';
import { useTransactions } from '../../hooks/useTransactions';
import { useAccounts } from '../../hooks/useAccounts';
import { calculateProfitLoss } from '../../utils/calculations';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { transactions, loading: tLoading } = useTransactions();
  const { accounts, loading: aLoading } = useAccounts();

  if (tLoading || aLoading) return <div className="text-center p-4">Loading...</div>;

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  const pl = calculateProfitLoss(transactions, accounts, startOfMonth, endOfMonth);

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Total Income (MTD)</h3>
          <p className="text-3xl font-bold text-green-600">${pl.totalIncome.toFixed(2)}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Total Expenses (MTD)</h3>
          <p className="text-3xl font-bold text-red-600">${pl.totalExpense.toFixed(2)}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Net Profit (MTD)</h3>
          <p className={`text-3xl font-bold ${pl.netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            ${pl.netProfit.toFixed(2)}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-700 mb-4">Quick Actions</h3>
          <div className="space-y-2">
            <Link to="/sales/new" className="block w-full bg-blue-600 text-white text-center py-2 rounded hover:bg-blue-700">New Sale</Link>
            <Link to="/expenses/new" className="block w-full bg-red-600 text-white text-center py-2 rounded hover:bg-red-700">New Expense</Link>
            <Link to="/vendors/new" className="block w-full bg-green-600 text-white text-center py-2 rounded hover:bg-green-700">New Vendor</Link>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-700 mb-4">Recent Transactions</h3>
          <ul className="divide-y divide-gray-200">
            {transactions.slice(0, 5).map(t => (
              <li key={t.id} className="py-2 flex justify-between">
                <span>{t.description}</span>
                <span className="font-medium">${t.total.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}