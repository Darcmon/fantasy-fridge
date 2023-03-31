import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.scss";
// import Login from "./pages/Login";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged} from "firebase/auth";
import { getFirestore} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDhCWkP6wCEPKsH-8BykortJj6gy2H0TQQ",
  authDomain: "fantasy-fridge.firebaseapp.com",
  projectId: "fantasy-fridge",
  storageBucket: "fantasy-fridge.appspot.com",
  messagingSenderId: "383044959479",
  appId: "1:383044959479:web:b62a7df65ab666f328e7f2",
  measurementId: "G-XE7VLG9FE3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);


function App() {

  return (
    <div className="App">
      <h1>Firebase INIT</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />}></Route>
          <Route path="/login" element={<h2>Login</h2>}></Route>
          <Route path="*" element={<h2>404 Not Found</h2>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
