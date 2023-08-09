// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { initializeFirestore, CACHE_SIZE_UNLIMITED, persistentLocalCache, persistentMultipleTabManager } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCjpZFvVdXWPN-hCyhXFE8-jlJgG39AM7E",
  authDomain: "edohospitals.firebaseapp.com",
  projectId: "edohospitals",
  storageBucket: "edohospitals.appspot.com",
  messagingSenderId: "143676448411",
  appId: "1:143676448411:web:6e6cec4e988a3f4377303e",
  measurementId: "G-X7HG0BLEP1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

//const db = getFirestore(app);

// const db = initializeFirestore(app, {
//     cacheSizeBytes: CACHE_SIZE_UNLIMITED,
//   });

const db = initializeFirestore(app, {
    localCache: persistentLocalCache({
      tabManager: persistentMultipleTabManager(),
      settings: {
        cacheSizeBytes: CACHE_SIZE_UNLIMITED,
      },
    }),
  });


export default db;