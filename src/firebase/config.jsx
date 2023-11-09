import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBwABvowcFfT9Et5EF1ArTd5sRML-NYNm8",
    authDomain: "object-detection-app-97166.firebaseapp.com",
    projectId: "object-detection-app-97166",
    storageBucket: "object-detection-app-97166.appspot.com",
    messagingSenderId: "745272269308",
    appId: "1:745272269308:web:221f77d2a7c62b52003a79"
};

const app = initializeApp(firebaseConfig);

export const imageDB = getStorage(app);
