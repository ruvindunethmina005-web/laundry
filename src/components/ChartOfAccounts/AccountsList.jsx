import React from 'react';
import { useAccounts } from '../../hooks/useAccounts';

export default function AccountsList() {
  const { accounts, loading } = useAccounts();

  if (loading) return <div className="text-center p-4">Loading...</div>;

  const grouped = accounts.reduce((acc, account) => {
    if (!acc[account.type]) acc[account.type] = [];
    acc[account.type].push(account);
    return acc;
  }, {});

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Chart of Accounts</h2>
      <div className="bg-white rounded-lg shadow p-6">
        {Object.entries(grouped).map(([type, accs]) => (
          <div key={type} className="mb-6">
            <h3 className="text-lg font-medium capitalize mb-2">{type}</h3>
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Code</th>
                  <th className="text-left py-2">Name</th>
                  <th className="text-left py-2">Sub Type</th>
                </tr>
              </thead>
              <tbody>
                {accs.map((a) => (
                  <tr key={a.id}>
                    <td className="py-1">{a.code}</td>
                    <td className="py-1">{a.name}</td>
                    <td className="py-1">{a.subType || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
}