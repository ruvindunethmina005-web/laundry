import React, { useState } from 'react';
import { useTransactions } from '../../hooks/useTransactions';
import { useAccounts } from '../../hooks/useAccounts';
import { generateBalanceSheet } from '../../utils/calculations';

export default function BalanceSheet() {
  const { transactions } = useTransactions();
  const { accounts } = useAccounts();
  const [asOfDate, setAsOfDate] = useState(new Date().toISOString().split('T')[0]);

  const result = generateBalanceSheet(transactions, accounts, new Date(asOfDate));

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Balance Sheet</h2>
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">As of Date</label>
          <input
            type="date"
            value={asOfDate}
            onChange={(e) => setAsOfDate(e.target.value)}
            className="px-3 py-2 border rounded-lg"
          />
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div>
            <h3 className="text-lg font-medium mb-3">Assets</h3>
            <table className="min-w-full">
              <tbody>
                {result.assets.map((asset) => (
                  <tr key={asset.id}>
                    <td className="py-1">{asset.name}</td>
                    <td className="py-1 text-right">${asset.balance.toFixed(2)}</td>
                  </tr>
                ))}
                <tr className="border-t font-bold">
                  <td className="py-2">Total Assets</td>
                  <td className="py-2 text-right">${result.totalAssets.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-3">Liabilities</h3>
            <table className="min-w-full">
              <tbody>
                {result.liabilities.map((liab) => (
                  <tr key={liab.id}>
                    <td className="py-1">{liab.name}</td>
                    <td className="py-1 text-right">${liab.balance.toFixed(2)}</td>
                  </tr>
                ))}
                <tr className="border-t font-bold">
                  <td className="py-2">Total Liabilities</td>
                  <td className="py-2 text-right">${result.totalLiabilities.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-3">Equity</h3>
            <table className="min-w-full">
              <tbody>
                {result.equity.map((eq) => (
                  <tr key={eq.id}>
                    <td className="py-1">{eq.name}</td>
                    <td className="py-1 text-right">${eq.balance.toFixed(2)}</td>
                  </tr>
                ))}
                <tr className="border-t font-bold">
                  <td className="py-2">Total Equity</td>
                  <td className="py-2 text-right">${result.totalEquity.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="mt-6 pt-4 border-t">
          <div className="flex justify-between text-lg">
            <span className="font-bold">Total Liabilities & Equity</span>
            <span className="font-bold">${(result.totalLiabilities + result.totalEquity).toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}