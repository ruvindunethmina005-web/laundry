import React from 'react';
import { useVendors } from '../../hooks/useVendors';
import { Link } from 'react-router-dom';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

export default function VendorList() {
  const { vendors, loading, deleteVendor } = useVendors();

  if (loading) return <div className="text-center p-4">Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Vendors</h2>
        <Link to="/vendors/new" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Add Vendor
        </Link>
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {vendors.map((v) => (
              <tr key={v.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{v.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{v.contact}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{v.address}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link to={`/vendors/${v.id}`} className="text-blue-600 hover:text-blue-900 mr-4">
                    <PencilIcon className="h-5 w-5 inline" />
                  </Link>
                  <button onClick={() => deleteVendor(v.id)} className="text-red-600 hover:text-red-900">
                    <TrashIcon className="h-5 w-5 inline" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}