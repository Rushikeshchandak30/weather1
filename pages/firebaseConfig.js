// firebaseConfig.js

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyChZ_0a-ama_P4I3VwbuPbNWBghGbKX2N8",
  authDomain: "weather-app-4528e.firebaseapp.com",
  projectId: "weather-app-4528e",
  storageBucket: "weather-app-4528e.appspot.com",
  messagingSenderId: "967012120890",
  appId: "1:967012120890:web:d13eabe5146c5dd43d7803",
  measurementId: "G-2ENRV6VL2C"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
