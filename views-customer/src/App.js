import { Routes, Route } from "react-router-dom";
import React from 'react';
import Home from './pages/Home/Home.jsx';
import Contoh from './pages/Contoh';
import Navbar from './components/Navbar/Navbar.jsx';

function App() {
  return (
    <>
      <Navbar />
      <div className="page-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/coffee" element={<Contoh />} />
        </Routes>
      </div>
    </>
  );
}

export default App;

