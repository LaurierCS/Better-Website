/**
 * Firebase Client Configuration
 * Initializes Firebase SDK with environment variables from Vite
 * Supports both Firestore and Realtime Database
 */

import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_LCS_FIREBASE_APIKEY,
    authDomain: import.meta.env.VITE_LCS_FIREBASE_AUTHDOMAIN,
    projectId: import.meta.env.VITE_LCS_FIREBASE_PROJECTID,
    storageBucket: import.meta.env.VITE_LCS_FIREBASE_STORAGEBUCKET,
    messagingSenderId: import.meta.env.VITE_LCS_FIREBASE_MESSAGINGSENDERID,
    appId: import.meta.env.VITE_LCS_FIREBASE_APPID,
    databaseURL: import.meta.env.VITE_LCS_FIREBASE_DBURL,
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const firestore = getFirestore(app);

export { app, database, firestore };
