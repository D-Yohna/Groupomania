import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Home from '../pages/home.js'
import Profil from '../pages/profil.js'
import Navbar from './Navbar.js'

const index = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" exact element={<Home />} />
                <Route path="/profil" exact element={<Profil />} />
                <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
        </Router>
    );
};

export default index;