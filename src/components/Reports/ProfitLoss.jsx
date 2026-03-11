import React, { useState } from 'react';
import { useTransactions } from '../../hooks/useTransactions';
import { useAccounts } from '../../hooks/useAccounts';
import { calculateProfitLoss } from '../../utils/calculations';

export default function ProfitLoss() {
  const { transactions } = useTransactions();
  const { accounts } = useAccounts();
  const [startDate, setStartDate] = useState(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1).toISOString().split('T')[0];
  });
  const [endDate, setEndDate] = useState(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth() + 1, 0).toISOString().split('T')[0];
  });

  const handleGenerate = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const result = calculateProfitLoss(transactions, accounts, start, end);
    return result;
  };

  const result = handleGenerate();

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Profit & Loss Statement</h2>
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex space-x-4 mb-4">
          <div>
            <label className="block text-gray-700 mb-1">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="px-3 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="px-3 py-2 border rounded-lg"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium mb-3">Income</h3>
            <table className="min-w-full">
              <tbody>
                {result.income.map((item) => (
                  <tr key={item.account.id}>
                    <td className="py-1">{item.account.name}</td>
                    <td className="py-1 text-right">${item.amount.toFixed(2)}</td>
                  </tr>
                ))}
                <tr className="border-t font-bold">
                  <td className="py-2">Total Income</td>
                  <td className="py-2 text-right">${result.totalIncome.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-3">Expenses</h3>
            <table className="min-w-full">
              <tbody>
                {result.expense.map((item) => (
                  <tr key={item.account.id}>
                    <td className="py-1">{item.account.name}</td>
                    <td className="py-1 text-right">${item.amount.toFixed(2)}</td>
                  </tr>
                ))}
                <tr className="border-t font-bold">
                  <td className="py-2">Total Expenses</td>
                  <td className="py-2 text-right">${result.totalExpense.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="mt-6 pt-4 border-t">
          <div className="flex justify-between text-xl font-bold">
            <span>Net Profit</span>
            <span className={result.netProfit >= 0 ? 'text-green-600' : 'text-red-600'}>
              ${result.netProfit.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}