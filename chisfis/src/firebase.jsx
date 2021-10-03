// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBAj6U2wCzY7UHQE69jnwIyRP8pbtAx9ys",
  authDomain: "testandtrip.firebaseapp.com",
  projectId: "testandtrip",
  storageBucket: "testandtrip.appspot.com",
  messagingSenderId: "823541175708",
  appId: "1:823541175708:web:23c40558ad7ccd26096459",
  measurementId: "G-HN4Z4DKY5P",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { db };
