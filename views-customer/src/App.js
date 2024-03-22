import { Routes, Route } from "react-router-dom";
import React from 'react';
import Home from './pages/Home/Home.jsx';
import Contoh from './pages/Contoh';
import Payment from './pages/Payment/Payment.jsx';
import PaymentGateway from "./pages/PaymentGateway/PaymentGateway.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/contoh" element={<Contoh />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/payment-gateway" element={<PaymentGateway />} />
    </Routes>
  );
}

export default App;

