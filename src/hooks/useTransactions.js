import { useState, useEffect } from 'react';
import { getDocuments, addDocument } from '../firebase/firestore';
import { useAuth } from '../context/AuthContext';

export const useTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchTransactions = async () => {
    const snapshot = await getDocuments('transactions');
    const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setTransactions(list);
    setLoading(false);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const addTransaction = async (transactionData) => {
    const newTransaction = {
      ...transactionData,
      createdBy: user.uid,
      createdAt: new Date(),
    };
    await addDocument('transactions', newTransaction);
    await fetchTransactions(); // refresh list
  };

  return { transactions, loading, addTransaction, refresh: fetchTransactions };
};