import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
	apiKey: "AIzaSyDWVUAO55_LZS_FebIjBBIi8CKhCucoN4A",
	authDomain: "skateshop-auth.firebaseapp.com",
	projectId: "skateshop-auth",
	storageBucket: "skateshop-auth.appspot.com",
	messagingSenderId: "637705404228",
	appId: "1:637705404228:web:68cdef9e622572b2db6111"
  };
  
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);