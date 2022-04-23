import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Button } from 'antd';
import './App.css';
import Gov from './Gov';
import Login from './Login';
import Pub from './Pub';

// Import the functions you need from the SDKs you need
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyB3Z2w1kTnntV9Irug14o2cQms7bmyhf40",
  authDomain: "clearway-db4d4.firebaseapp.com",
  projectId: "clearway-db4d4",
  storageBucket: "clearway-db4d4.appspot.com",
  messagingSenderId: "925241230126",
  appId: "1:925241230126:web:5d5d0edc85433d8f36f0bf",
  measurementId: "G-TZQW4ES09W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

function App() {
    return (
        <Router>
            <Link to="/">
                <Button type="primary">Login</Button>
            </Link>
            <Link to="/pub">
                <Button type="primary">Public</Button>
            </Link>
            <Link to="/gov">
                <Button type="primary">Local Council Portal</Button>
            </Link>
            <Routes>
                <Route path="/gov" element={<Gov />} />
                <Route path="/pub" element={<Pub />} />
                <Route path="/" element={<Login />} />
            </Routes>
        </Router>
    );
}

export default App;
