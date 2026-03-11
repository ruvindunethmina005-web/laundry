import React, { useState } from 'react';
import { useAccounts } from '../../hooks/useAccounts';
import { useVendors } from '../../hooks/useVendors';
import { useTransactions } from '../../hooks/useTransactions';
import { useNavigate } from 'react-router-dom';

export default function ExpenseEntry() {
  const { accounts } = useAccounts();
  const { vendors } = useVendors();
  const { addTransaction } = useTransactions();
  const navigate = useNavigate();

  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [description, setDescription] = useState('');
  const [vendorId, setVendorId] = useState('');
  const [amount, setAmount] = useState('');
  const [expenseAccountId, setExpenseAccountId] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash'); // cash or payable

  const expenseAccounts = accounts.filter(a => a.type === 'expense');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);
    const cashAccount = accounts.find(a => a.code === '1000');
    const payableAccount = accounts.find(a => a.code === '2000');

    let entries = [];
    if (paymentMethod === 'cash') {
      entries = [
        { accountId: expenseAccountId, debit: numAmount, credit: 0 },
        { accountId: cashAccount.id, debit: 0, credit: numAmount },
      ];
    } else {
      entries = [
        { accountId: expenseAccountId, debit: numAmount, credit: 0 },
        { accountId: payableAccount.id, debit: 0, credit: numAmount },
      ];
    }

    await addTransaction({
      date: new Date(date),
      description,
      type: 'expense',
      vendorId: vendorId || null,
      entries,
      total: numAmount,
    });

    navigate('/transactions');
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-semibold mb-6">Record Expense</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Vendor</label>
          <select
            value={vendorId}
            onChange={(e) => setVendorId(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            required
          >
            <option value="">Select Vendor</option>
            {vendors.map(v => <option key={v.id} value={v.id}>{v.name}</option>)}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Expense Account</label>
          <select
            value={expenseAccountId}
            onChange={(e) => setExpenseAccountId(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            required
          >
            <option value="">Select Account</option>
            {expenseAccounts.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Amount</label>
          <input
            type="number"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Payment Method</label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="cash"
                checked={paymentMethod === 'cash'}
                onChange={() => setPaymentMethod('cash')}
                className="mr-2"
              />
              Cash
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="payable"
                checked={paymentMethod === 'payable'}
                onChange={() => setPaymentMethod('payable')}
                className="mr-2"
              />
              Accounts Payable
            </label>
          </div>
        </div>
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/transactions')}
            className="px-4 py-2 border rounded-lg hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Save Expense
          </button>
        </div>
      </form>
    </div>
  );
}