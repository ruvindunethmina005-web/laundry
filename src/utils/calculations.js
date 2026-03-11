export const calculateProfitLoss = (transactions, accounts, startDate, endDate) => {
  const filtered = transactions.filter(t => {
    const tDate = t.date.toDate ? t.date.toDate() : new Date(t.date);
    return tDate >= startDate && tDate <= endDate;
  });

  const incomeMap = new Map();
  const expenseMap = new Map();

  filtered.forEach(t => {
    t.entries.forEach(entry => {
      const account = accounts.find(a => a.id === entry.accountId);
      if (!account) return;
      if (account.type === 'income') {
        const curr = incomeMap.get(account.id) || 0;
        incomeMap.set(account.id, curr + (entry.credit - entry.debit));
      } else if (account.type === 'expense') {
        const curr = expenseMap.get(account.id) || 0;
        expenseMap.set(account.id, curr + (entry.debit - entry.credit));
      }
    });
  });

  const totalIncome = Array.from(incomeMap.values()).reduce((a, b) => a + b, 0);
  const totalExpense = Array.from(expenseMap.values()).reduce((a, b) => a + b, 0);
  const netProfit = totalIncome - totalExpense;

  return {
    income: Array.from(incomeMap.entries()).map(([accountId, amount]) => ({
      account: accounts.find(a => a.id === accountId),
      amount,
    })),
    expense: Array.from(expenseMap.entries()).map(([accountId, amount]) => ({
      account: accounts.find(a => a.id === accountId),
      amount,
    })),
    totalIncome,
    totalExpense,
    netProfit,
  };
};

export const generateBalanceSheet = (transactions, accounts, asOfDate) => {
  // Simplified: calculate balances for asset, liability, equity accounts up to asOfDate
  const filtered = transactions.filter(t => {
    const tDate = t.date.toDate ? t.date.toDate() : new Date(t.date);
    return tDate <= asOfDate;
  });

  const balances = new Map();

  filtered.forEach(t => {
    t.entries.forEach(entry => {
      const account = accounts.find(a => a.id === entry.accountId);
      if (!account) return;
      const current = balances.get(account.id) || { debit: 0, credit: 0 };
      balances.set(account.id, {
        debit: current.debit + (entry.debit || 0),
        credit: current.credit + (entry.credit || 0),
      });
    });
  });

  const assets = [];
  const liabilities = [];
  const equity = [];

  accounts.forEach(account => {
    const bal = balances.get(account.id) || { debit: 0, credit: 0 };
    const balance = account.type === 'asset' || account.type === 'expense'
      ? bal.debit - bal.credit
      : bal.credit - bal.debit;

    if (account.type === 'asset') assets.push({ ...account, balance });
    else if (account.type === 'liability') liabilities.push({ ...account, balance });
    else if (account.type === 'equity') equity.push({ ...account, balance });
  });

  const totalAssets = assets.reduce((sum, a) => sum + a.balance, 0);
  const totalLiabilities = liabilities.reduce((sum, l) => sum + l.balance, 0);
  const totalEquity = equity.reduce((sum, e) => sum + e.balance, 0);

  return { assets, liabilities, equity, totalAssets, totalLiabilities, totalEquity };
};