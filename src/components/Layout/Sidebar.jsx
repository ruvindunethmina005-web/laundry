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
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64 bg-white border-r border-gray-200">
        <div className="h-0 flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          {/* Logo area */}
          <div className="flex items-center flex-shrink-0 px-4">
            <span className="text-xl font-semibold text-gray-800">Laundry<span className="text-blue-600">Accounting</span></span>
          </div>
          {/* Navigation */}
          <nav className="mt-8 flex-1 px-2 space-y-1">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.to}
                className={({ isActive }) =>
                  `group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <item.icon
                      className={`mr-3 h-5 w-5 ${
                        isActive ? 'text-blue-700' : 'text-gray-500 group-hover:text-gray-700'
                      }`}
                    />
                    {item.name}
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </div>
        {/* Optional user profile at bottom */}
        <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-sm font-medium text-blue-700">U</span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700">User</p>
              <button className="text-xs text-gray-500 hover:text-gray-700">Sign out</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
