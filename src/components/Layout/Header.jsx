import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Menu } from '@headlessui/react';
import { BellIcon, UserCircleIcon } from '@heroicons/react/24/outline';

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="flex justify-between items-center px-6 py-3">
        <h1 className="text-xl font-semibold text-gray-800 md:hidden">Laundry Accounting</h1>
        <div className="flex-1" /> {/* spacer */}
        <div className="flex items-center space-x-4">
          {/* Notification bell (placeholder) */}
          <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100">
            <BellIcon className="h-6 w-6" />
          </button>
          {/* Profile dropdown */}
          <Menu as="div" className="relative">
            <Menu.Button className="flex items-center space-x-2 focus:outline-none">
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-sm font-medium text-blue-700">
                  {user?.email?.charAt(0).toUpperCase() || 'U'}
                </span>
              </div>
              <span className="hidden md:block text-sm text-gray-700">{user?.email}</span>
            </Menu.Button>
            <Menu.Items className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={logout}
                    className={`block w-full text-left px-4 py-2 text-sm ${
                      active ? 'bg-gray-100' : ''
                    }`}
                  >
                    Sign Out
                  </button>
                )}
              </Menu.Item>
            </Menu.Items>
          </Menu>
        </div>
      </div>
    </header>
  );
}
