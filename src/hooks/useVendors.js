import { useState, useEffect } from 'react';
import { getDocuments, addDocument, updateDocument, deleteDocument } from '../firebase/firestore';

export const useVendors = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchVendors = async () => {
    const snapshot = await getDocuments('vendors');
    const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setVendors(list);
    setLoading(false);
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  const addVendor = async (vendorData) => {
    await addDocument('vendors', vendorData);
    await fetchVendors();
  };

  const updateVendor = async (id, data) => {
    await updateDocument('vendors', id, data);
    await fetchVendors();
  };

  const deleteVendor = async (id) => {
    await deleteDocument('vendors', id);
    await fetchVendors();
  };

  return { vendors, loading, addVendor, updateVendor, deleteVendor };
};