import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Menu } from '@headlessui/react';
import { UserCircleIcon } from '@heroicons/react/24/outline';

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm">
      <div className="flex justify-between items-center px-6 py-4">
        <h1 className="text-xl font-semibold text-gray-800">Laundry Accounting</h1>
        <Menu as="div" className="relative">
          <Menu.Button className="flex items-center space-x-2 focus:outline-none">
            <UserCircleIcon className="h-8 w-8 text-gray-600" />
            <span className="text-gray-700">{user?.email}</span>
          </Menu.Button>
          <Menu.Items className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
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
    </header>
  );
}