import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Button } from 'antd';
import './App.css';
import Gov from './Gov';
import Login from './Login';
import Pub from './Pub';

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
