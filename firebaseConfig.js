import { initializeApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import { ReactNativeAsyncStorage } from "@react-native-async-storage/async-storage";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAUx1TE66DucXlfcRHodgIsAjUiXWri-5s",
  authDomain: "swapflex-server.firebaseapp.com",
  projectId: "swapflex-server",
  storageBucket: "swapflex-server.appspot.com",
  messagingSenderId: "686221471680",
  appId: "1:686221471680:web:91c06de84a87c6e2702225",
  measurementId: "G-V85TP80YN9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

let authInitialized = false;
let authInstance;

function initializeFirebaseAuth() {
  if (!authInitialized) {
    authInstance = initializeAuth(app, {
      persistence: getReactNativePersistence(ReactNativeAsyncStorage),
    });
    authInitialized = true;
  }
  return authInstance;
}
const auth = initializeFirebaseAuth();
const db = getDatabase(app);

export { auth, db };
