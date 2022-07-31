// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore/lite';
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBTCm8AcuOsVSWOMvqsznzMhvzZXaFUbgo",
    authDomain: "tetris-records.firebaseapp.com",
    projectId: "tetris-records",
    storageBucket: "tetris-records.appspot.com",
    messagingSenderId: "385969767559",
    appId: "1:385969767559:web:ff32be184bab64b54fa422",
    measurementId: "G-BNVBVMPZXL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);

// Get a list of cities from your database
export async function getRecords() {
    const citiesCol = collection(db, 'records');
    const citySnapshot = await getDocs(citiesCol);
    const records = citySnapshot.docs.map(doc => doc.data());
    return records;
}

export async function addRecord(record) {
    await addDoc(collection(db, "records"), record);
}
