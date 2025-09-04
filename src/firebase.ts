import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCiPy4JoDXMTTUDNOOn7pXoOayVOQfPSSg",
  authDomain: "liquidity-assignment.firebaseapp.com",
  projectId: "liquidity-assignment",
  storageBucket: "liquidity-assignment.firebasestorage.app",
  messagingSenderId: "997095189704",
  appId: "1:997095189704:web:6c47b2f14b870ed6d989fd",
  measurementId: "G-Y44R5WP8ZV"
}

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
