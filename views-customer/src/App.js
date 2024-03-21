import { Routes, Route } from "react-router-dom";
import React from 'react';
import Home from './pages/Home/Home.jsx';
import Contoh from './pages/Contoh';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/contoh" element={<Contoh />} />
    </Routes>
  );
}

export default App;
