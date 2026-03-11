import React from 'react';
import { useTransactions } from '../../hooks/useTransactions';
import { useAccounts } from '../../hooks/useAccounts';
import { calculateProfitLoss } from '../../utils/calculations';
import { Link } from 'react-router-dom';
import {
  CurrencyDollarIcon,
  ShoppingCartIcon,
  ChartBarIcon,
  PlusIcon,
  UsersIcon,
  ArrowTrendingUpIcon,
} from '@heroicons/react/24/outline';

export default function Dashboard() {
  const { transactions, loading: tLoading } = useTransactions();
  const { accounts, loading: aLoading } = useAccounts();

  if (tLoading || aLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  const pl = calculateProfitLoss(transactions, accounts, startOfMonth, endOfMonth);

  const formatCurrency = (value) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

  const metrics = [
    {
      label: 'Total Income',
      value: pl.totalIncome,
      icon: ArrowTrendingUpIcon,
      color: 'green',
      bg: 'bg-green-50',
      text: 'text-green-700',
    },
    {
      label: 'Total Expenses',
      value: pl.totalExpense,
      icon: ShoppingCartIcon,
      color: 'red',
      bg: 'bg-red-50',
      text: 'text-red-700',
    },
    {
      label: 'Net Profit',
      value: pl.netProfit,
      icon: ChartBarIcon,
      color: pl.netProfit >= 0 ? 'green' : 'red',
      bg: pl.netProfit >= 0 ? 'bg-green-50' : 'bg-red-50',
      text: pl.netProfit >= 0 ? 'text-green-700' : 'text-red-700',
    },
  ];

  const actions = [
    { label: 'New Sale', to: '/sales/new', icon: PlusIcon, color: 'blue' },
    { label: 'New Expense', to: '/expenses/new', icon: ShoppingCartIcon, color: 'red' },
    { label: 'New Vendor', to: '/vendors/new', icon: UsersIcon, color: 'green' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>
        <p className="text-gray-600 mt-1">Welcome back! Here's your monthly overview.</p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metrics.map((metric, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{metric.label}</p>
                <p className={`text-2xl font-bold mt-1 ${metric.text}`}>
                  {formatCurrency(metric.value)}
                </p>
              </div>
              <div className={`${metric.bg} p-3 rounded-lg`}>
                <metric.icon className={`h-6 w-6 ${metric.text}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions & Recent Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-3 gap-3">
            {actions.map((action, idx) => (
              <Link
                key={idx}
                to={action.to}
                className={`flex flex-col items-center justify-center p-4 bg-${action.color}-50 rounded-lg hover:bg-${action.color}-100 transition-colors group`}
              >
                <action.icon className={`h-6 w-6 text-${action.color}-600 mb-1 group-hover:scale-110 transition`} />
                <span className={`text-xs font-medium text-${action.color}-700`}>{action.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
            <Link to="/transactions" className="text-sm text-blue-600 hover:text-blue-700">
              View all
            </Link>
          </div>
          {transactions.length === 0 ? (
            <p className="text-gray-500 text-center py-6">No transactions yet.</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {transactions.slice(0, 5).map((t) => (
                <li key={t.id} className="py-3 flex items-center justify-between">
                  <div className="flex items-center">
                    <span className={`w-2 h-2 rounded-full ${t.type === 'sale' ? 'bg-green-500' : 'bg-red-500'} mr-3`} />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{t.description}</p>
                      <p className="text-xs text-gray-500">
                        {t.date?.toDate ? t.date.toDate().toLocaleDateString() : new Date(t.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <span className={`text-sm font-semibold ${t.type === 'sale' ? 'text-green-600' : 'text-red-600'}`}>
                    {formatCurrency(t.total)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
