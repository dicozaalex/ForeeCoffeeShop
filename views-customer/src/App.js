import { Routes, Route } from "react-router-dom";
import React from 'react';
import Home from './pages/Home/Home.jsx';
import Contoh from './pages/Contoh';
import Register from "./pages/Register/Register.jsx";

function App() {
  return (
    <>
      <div className="page-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/coffee" element={<Contoh />} />
        </Routes>
      </div>
    </>
  );
}

export default App;

