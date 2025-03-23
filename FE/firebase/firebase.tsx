import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBklgSjOkQ6bS8ZXFNI3tCouKx3ZPXcKQs",
    authDomain: "chats-48874.firebaseapp.com",
    projectId: "chats-48874",
    storageBucket: "chats-48874.firebasestorage.app",
    databaseURL: "https://chats-48874-default-rtdb.firebaseio.com",
    messagingSenderId: "953620401924",
    appId: "1:953620401924:web:0b52cd9712d46adaea0a51",
    measurementId: "G-X91362GNP1"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
export const storage = getStorage(app);
