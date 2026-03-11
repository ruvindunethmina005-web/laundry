import React from 'react';
import { useTransactions } from '../../hooks/useTransactions';
import { useAccounts } from '../../hooks/useAccounts';
import { calculateProfitLoss } from '../../utils/calculations';
import { Link } from 'react-router-dom';
import {
  CurrencyDollarIcon,
  ShoppingCartIcon,
  ChartBarIcon,
  PlusCircleIcon,
  UsersIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';

export default function Dashboard() {
  const { transactions, loading: tLoading } = useTransactions();
  const { accounts, loading: aLoading } = useAccounts();

  if (tLoading || aLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  const pl = calculateProfitLoss(transactions, accounts, startOfMonth, endOfMonth);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(value);
  };

  const metrics = [
    {
      title: 'Total Income',
      value: pl.totalIncome,
      icon: CurrencyDollarIcon,
      color: 'green',
      bgColor: 'bg-green-100',
      textColor: 'text-green-600',
    },
    {
      title: 'Total Expenses',
      value: pl.totalExpense,
      icon: ShoppingCartIcon,
      color: 'red',
      bgColor: 'bg-red-100',
      textColor: 'text-red-600',
    },
    {
      title: 'Net Profit',
      value: pl.netProfit,
      icon: ChartBarIcon,
      color: pl.netProfit >= 0 ? 'green' : 'red',
      bgColor: pl.netProfit >= 0 ? 'bg-green-100' : 'bg-red-100',
      textColor: pl.netProfit >= 0 ? 'text-green-600' : 'text-red-600',
    },
  ];

  const quickActions = [
    { label: 'New Sale', path: '/sales/new', icon: PlusCircleIcon, color: 'blue' },
    { label: 'New Expense', path: '/expenses/new', icon: ShoppingCartIcon, color: 'red' },
    { label: 'New Vendor', path: '/vendors/new', icon: UsersIcon, color: 'green' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your laundry business.</p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                <p className={`text-3xl font-bold mt-2 ${metric.textColor}`}>
                  {formatCurrency(metric.value)}
                </p>
              </div>
              <div className={`${metric.bgColor} p-4 rounded-xl`}>
                <metric.icon className={`h-8 w-8 ${metric.textColor}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions & Recent Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <ClockIcon className="h-5 w-5 mr-2 text-gray-600" />
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {quickActions.map((action, idx) => (
              <Link
                key={idx}
                to={action.path}
                className={`flex flex-col items-center justify-center p-6 bg-${action.color}-50 rounded-xl hover:bg-${action.color}-100 transition-colors group`}
              >
                <action.icon className={`h-8 w-8 text-${action.color}-600 mb-2 group-hover:scale-110 transition-transform`} />
                <span className={`text-sm font-medium text-${action.color}-700`}>{action.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <ClockIcon className="h-5 w-5 mr-2 text-gray-600" />
              Recent Transactions
            </h2>
            <Link to="/transactions" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              View all
            </Link>
          </div>
          {transactions.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No transactions yet. Click "New Sale" or "New Expense" to get started.
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {transactions.slice(0, 5).map((t) => (
                <li key={t.id} className="py-3 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-2 h-2 rounded-full mr-3 ${t.type === 'sale' ? 'bg-green-500' : 'bg-red-500'}`} />
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
