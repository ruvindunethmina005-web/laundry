import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyACi3wqYgY-cKjN9yKLX2xk2aoiap4gvBo",
  authDomain: "accapplication-laundry.firebaseapp.com",
  projectId: "accapplication-laundry",
  storageBucket: "accapplication-laundry.firebasestorage.app",
  messagingSenderId: "195119477461",
  appId: "1:195119477461:web:01812312c2c08eb053e85c",
  measurementId: "G-E85LS6L86Q"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };

