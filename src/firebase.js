import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCFQvn2egzXx88pTmEGrcE7xfB0R6SYYAs",
  authDomain: "movie-app-cf56b.firebaseapp.com",
  projectId: "movie-app-cf56b",
  storageBucket: "movie-app-cf56b.firebasestorage.app",
  messagingSenderId: "420752560913",
  appId: "1:420752560913:web:9e211f529040e404f8f2b0"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
