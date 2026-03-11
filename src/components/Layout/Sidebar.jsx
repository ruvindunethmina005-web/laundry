import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  HomeIcon,
  CurrencyDollarIcon,
  ShoppingCartIcon,
  UsersIcon,
  DocumentTextIcon,
  ChartBarIcon,
  BookOpenIcon,
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard', to: '/', icon: HomeIcon },
  { name: 'Sales', to: '/sales/new', icon: CurrencyDollarIcon },
  { name: 'Expenses', to: '/expenses/new', icon: ShoppingCartIcon },
  { name: 'Transactions', to: '/transactions', icon: DocumentTextIcon },
  { name: 'Vendors', to: '/vendors', icon: UsersIcon },
  { name: 'P&L', to: '/reports/profit-loss', icon: ChartBarIcon },
  { name: 'Balance Sheet', to: '/reports/balance-sheet', icon: ChartBarIcon },
  { name: 'Chart of Accounts', to: '/chart-of-accounts', icon: BookOpenIcon },
];

export default function Sidebar() {
  return (
    <div className="w-64 bg-white shadow-lg">
      <nav className="mt-5 px-2">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.to}
            className={({ isActive }) =>
              `group flex items-center px-2 py-2 text-sm font-medium rounded-md mb-1 ${
                isActive
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`
            }
          >
            <item.icon
              className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
              aria-hidden="true"
            />
            {item.name}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}