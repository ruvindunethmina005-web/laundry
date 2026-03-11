import { db } from './config';
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  where,
  Timestamp,
} from 'firebase/firestore';

// Generic CRUD helpers
export const addDocument = (col, data) => addDoc(collection(db, col), { ...data, createdAt: Timestamp.now() });
export const getDocuments = (col) => getDocs(collection(db, col));
export const getDocument = (col, id) => getDoc(doc(db, col, id));
export const updateDocument = (col, id, data) => updateDoc(doc(db, col, id), data);
export const deleteDocument = (col, id) => deleteDoc(doc(db, col, id));

// Specific queries
export const getTransactionsByDateRange = (startDate, endDate) => {
  const q = query(
    collection(db, 'transactions'),
    where('date', '>=', startDate),
    where('date', '<=', endDate),
    orderBy('date', 'desc')
  );
  return getDocs(q);
};