import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCmqi9iy5Bfi-zVTS8qT9Tl8cmn8iRWzoo",
  authDomain: "taekwondo-org-nrb.firebaseapp.com",
  projectId: "taekwondo-org-nrb",
  storageBucket: "taekwondo-org-nrb.appspot.com",
  messagingSenderId: "92207465879",
  appId: "1:92207465879:web:f1b231cde940fc6a9e30d2",
  measurementId: "G-KWJLWHC4S4",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

let analytics: any;
isSupported().then((supported) => {
  if (supported) analytics = getAnalytics(app);
});

export { app, db, auth, storage, analytics };
