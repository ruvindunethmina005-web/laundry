import React, { useState } from 'react';
import { useAccounts } from '../../hooks/useAccounts';
import { useVendors } from '../../hooks/useVendors';
import { useTransactions } from '../../hooks/useTransactions';
import { useNavigate } from 'react-router-dom';
import { CalendarIcon, UserIcon, TagIcon } from '@heroicons/react/24/outline';

export default function SaleEntry() {
  const { accounts } = useAccounts();
  const { vendors } = useVendors();
  const { addTransaction } = useTransactions();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    date: new Date().toISOString().split('T')[0],
    description: '',
    vendorId: '',
    amount: '',
    paymentMethod: 'cash',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const numAmount = parseFloat(form.amount);
    const cashAccount = accounts.find(a => a.code === '1000');
    const receivableAccount = accounts.find(a => a.code === '1100');
    const revenueAccount = accounts.find(a => a.code === '4000');

    let entries = [];
    if (form.paymentMethod === 'cash') {
      entries = [
        { accountId: cashAccount.id, debit: numAmount, credit: 0 },
        { accountId: revenueAccount.id, debit: 0, credit: numAmount },
      ];
    } else {
      entries = [
        { accountId: receivableAccount.id, debit: numAmount, credit: 0 },
        { accountId: revenueAccount.id, debit: 0, credit: numAmount },
      ];
    }

    await addTransaction({
      date: new Date(form.date),
      description: form.description,
      type: 'sale',
      vendorId: form.vendorId || null,
      entries,
      total: numAmount,
    });
    navigate('/transactions');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Record New Sale</h2>
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-6">
        {/* Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
          <div className="relative">
            <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="pl-10 w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <input
            type="text"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., Laundry service for customer"
            required
          />
        </div>

        {/* Vendor */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Vendor (optional)</label>
          <div className="relative">
            <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <select
              value={form.vendorId}
              onChange={(e) => setForm({ ...form, vendorId: e.target.value })}
              className="pl-10 w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
            >
              <option value="">None</option>
              {vendors.map(v => <option key={v.id} value={v.id}>{v.name}</option>)}
            </select>
          </div>
        </div>

        {/* Amount */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
          <div className="relative">
            <TagIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="number"
              step="0.01"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
              className="pl-10 w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="0.00"
              required
            />
          </div>
        </div>

        {/* Payment Method */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
          <div className="flex space-x-4">
            {['cash', 'receivable'].map((method) => (
              <label key={method} className="flex items-center">
                <input
                  type="radio"
                  value={method}
                  checked={form.paymentMethod === method}
                  onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-700 capitalize">{method}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={() => navigate('/transactions')}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Save Sale
          </button>
        </div>
      </form>
    </div>
  );
}
