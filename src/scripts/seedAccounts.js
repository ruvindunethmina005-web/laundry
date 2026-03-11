import { db } from '../firebase/config';
import { collection, addDoc } from 'firebase/firestore';
import { CHART_OF_ACCOUNTS } from '../utils/constants';

const seedAccounts = async () => {
  try {
    for (const account of CHART_OF_ACCOUNTS) {
      await addDoc(collection(db, 'chartOfAccounts'), {
        ...account,
        isActive: true,
        description: '',
      });
      console.log(`Added ${account.name}`);
    }
    console.log('All accounts seeded successfully!');
  } catch (error) {
    console.error('Error seeding accounts:', error);
  }
};

seedAccounts();