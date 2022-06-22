import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC65ts0yaY4sy3ezMi8raWm0RhZJ-dqABo",
    authDomain: "pet-tracking-app-51857.firebaseapp.com",
    projectId: "pet-tracking-app-51857",
    storageBucket: "pet-tracking-app-51857.appspot.com",
    messagingSenderId: "386818168474",
    appId: "1:386818168474:web:5a867af9f23ba3e2487123",
    measurementId: "G-JTXBFQYNTV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const FireBaseStorage = getStorage(app);