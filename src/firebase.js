// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {
    getFirestore,
    collection,
    getDocs,
    addDoc,
    query,
    orderBy,
    limit,
    doc,
    updateDoc,
    where
} from 'firebase/firestore';
import {getAnalytics} from "firebase/analytics";
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
    const recordsRef = collection(db, 'records');

    const q = query(recordsRef, orderBy("score", "desc"), limit(100));

    const citySnapshot = await getDocs(q);
    const records = citySnapshot.docs.map(doc => ({...doc.data(), id: doc.id}));
    return records;
}

export async function addRecord(record) {
    if (record.id) {
        const frankDocRef = doc(db, "records", record.id);
        // To update age and favorite color:
        await updateDoc(frankDocRef, {
            "score": parseInt(record.score),
            "date": new Date()
        });
    } else {
        await addDoc(collection(db, "records"), record);
    }
}
