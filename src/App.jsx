import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard/Dashboard';
import SaleEntry from './components/Transactions/SaleEntry';
import ExpenseEntry from './components/Transactions/ExpenseEntry';
import TransactionList from './components/Transactions/TransactionList';
import VendorList from './components/Vendors/VendorList';
import VendorForm from './components/Vendors/VendorForm';
import VendorDetails from './components/Vendors/VendorDetails';
import ProfitLoss from './components/Reports/ProfitLoss';
import BalanceSheet from './components/Reports/BalanceSheet';
import AccountsList from './components/ChartOfAccounts/AccountsList';
import Login from './components/Auth/Login';

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
        <Route index element={<Dashboard />} />
        <Route path="sales/new" element={<SaleEntry />} />
        <Route path="expenses/new" element={<ExpenseEntry />} />
        <Route path="transactions" element={<TransactionList />} />
        <Route path="vendors" element={<VendorList />} />
        <Route path="vendors/new" element={<VendorForm />} />
        <Route path="vendors/:id" element={<VendorDetails />} />
        <Route path="reports/profit-loss" element={<ProfitLoss />} />
        <Route path="reports/balance-sheet" element={<BalanceSheet />} />
        <Route path="chart-of-accounts" element={<AccountsList />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;