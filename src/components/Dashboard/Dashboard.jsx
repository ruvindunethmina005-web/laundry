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
  ArrowPathIcon,
} from '@heroicons/react/24/outline';

export default function Dashboard() {
  const { transactions, loading: tLoading } = useTransactions();
  const { accounts, loading: aLoading } = useAccounts();

  if (tLoading || aLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  const pl = calculateProfitLoss(transactions, accounts, startOfMonth, endOfMonth);

  const formatCurrency = (value) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

  // Calculate income and expense for mini chart (last 7 days)
  const last7Days = [...Array(7)].map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    return d.toISOString().split('T')[0];
  }).reverse();

  const dailyIncome = last7Days.map(date => {
    const dayTransactions = transactions.filter(t => {
      const tDate = t.date?.toDate ? t.date.toDate().toISOString().split('T')[0] : new Date(t.date).toISOString().split('T')[0];
      return tDate === date && t.type === 'sale';
    });
    return dayTransactions.reduce((sum, t) => sum + t.total, 0);
  });

  const dailyExpense = last7Days.map(date => {
    const dayTransactions = transactions.filter(t => {
      const tDate = t.date?.toDate ? t.date.toDate().toISOString().split('T')[0] : new Date(t.date).toISOString().split('T')[0];
      return tDate === date && t.type === 'expense';
    });
    return dayTransactions.reduce((sum, t) => sum + t.total, 0);
  });

  const maxValue = Math.max(...dailyIncome, ...dailyExpense, 1);

  const metrics = [
    {
      label: 'Total Income',
      value: pl.totalIncome,
      icon: ArrowTrendingUpIcon,
      gradient: 'from-green-500 to-green-600',
      textColor: 'text-white',
    },
    {
      label: 'Total Expenses',
      value: pl.totalExpense,
      icon: ShoppingCartIcon,
      gradient: 'from-red-500 to-red-600',
      textColor: 'text-white',
    },
    {
      label: 'Net Profit',
      value: pl.netProfit,
      icon: ChartBarIcon,
      gradient: pl.netProfit >= 0 ? 'from-blue-500 to-blue-600' : 'from-orange-500 to-orange-600',
      textColor: 'text-white',
    },
  ];

  const quickActions = [
    { label: 'New Sale', to: '/sales/new', icon: PlusIcon, color: 'indigo' },
    { label: 'New Expense', to: '/expenses/new', icon: ShoppingCartIcon, color: 'red' },
    { label: 'New Vendor', to: '/vendors/new', icon: UsersIcon, color: 'green' },
  ];

  return (
    <div className="space-y-8 pb-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's your business overview.</p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition">
          <ArrowPathIcon className="h-5 w-5" />
          <span>Refresh</span>
        </button>
      </div>

      {/* Stats Cards with Gradient */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metrics.map((metric, idx) => (
          <div
            key={idx}
            className={`relative overflow-hidden bg-gradient-to-br ${metric.gradient} rounded-2xl shadow-lg p-6 text-white`}
          >
            <div className="absolute right-0 top-0 transform translate-x-6 -translate-y-6 opacity-10">
              <metric.icon className="h-32 w-32" />
            </div>
            <div className="relative">
              <div className="flex items-center justify-between">
                <metric.icon className="h-8 w-8 opacity-90" />
                <span className="text-sm font-medium opacity-90">{metric.label}</span>
              </div>
              <p className="text-3xl font-bold mt-4">{formatCurrency(metric.value)}</p>
              <p className="text-sm opacity-75 mt-1">
                {idx === 2 ? (pl.netProfit >= 0 ? 'Profit' : 'Loss') : 'This month'}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Mini Chart & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Mini Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue vs Expenses (Last 7 days)</h3>
          <div className="h-48 flex items-end space-x-2">
            {last7Days.map((date, i) => (
              <div key={date} className="flex-1 flex flex-col items-center space-y-2">
                <div className="w-full flex justify-center space-x-1">
                  <div
                    className="w-4 bg-green-400 rounded-t"
                    style={{ height: `${(dailyIncome[i] / maxValue) * 100}px` }}
                  />
                  <div
                    className="w-4 bg-red-400 rounded-t"
                    style={{ height: `${(dailyExpense[i] / maxValue) * 100}px` }}
                  />
                </div>
                <span className="text-xs text-gray-500">{date.slice(5)}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-center space-x-4 mt-4 text-sm">
            <div className="flex items-center">
              <span className="w-3 h-3 bg-green-400 rounded mr-2" />
              <span>Income</span>
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 bg-red-400 rounded mr-2" />
              <span>Expenses</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            {quickActions.map((action, idx) => (
              <Link
                key={idx}
                to={action.to}
                className={`flex items-center justify-between w-full p-4 bg-${action.color}-50 rounded-xl hover:bg-${action.color}-100 transition group`}
              >
                <div className="flex items-center">
                  <action.icon className={`h-6 w-6 text-${action.color}-600 mr-3`} />
                  <span className={`font-medium text-${action.color}-700`}>{action.label}</span>
                </div>
                <span className={`text-${action.color}-600 group-hover:translate-x-1 transition`}>→</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Transactions & Top Services */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Transactions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
            <Link to="/transactions" className="text-sm text-indigo-600 hover:text-indigo-700">
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
                    <span
                      className={`w-2 h-2 rounded-full mr-3 ${
                        t.type === 'sale' ? 'bg-green-500' : 'bg-red-500'
                      }`}
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{t.description}</p>
                      <p className="text-xs text-gray-500">
                        {t.date?.toDate ? t.date.toDate().toLocaleDateString() : new Date(t.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`text-sm font-semibold ${
                      t.type === 'sale' ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {formatCurrency(t.total)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Top Services (Placeholder – you can replace with real data) */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Services</h3>
          <div className="space-y-4">
            {['Wash & Fold', 'Dry Cleaning', 'Ironing', 'Stain Removal'].map((service, idx) => (
              <div key={service} className="flex items-center justify-between">
                <span className="text-sm text-gray-700">{service}</span>
                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-900 mr-4">
                    {formatCurrency(Math.random() * 500 + 100)}
                  </span>
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-indigo-600 h-2 rounded-full"
                      style={{ width: `${Math.random() * 70 + 20}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
