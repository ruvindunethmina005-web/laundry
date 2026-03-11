import { useState, useEffect } from 'react';
import { getDocuments } from '../firebase/firestore';

export const useAccounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAccounts = async () => {
      const snapshot = await getDocuments('chartOfAccounts');
      const accountsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAccounts(accountsList);
      setLoading(false);
    };
    fetchAccounts();
  }, []);

  return { accounts, loading };
};