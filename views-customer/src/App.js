import { Routes, Route } from "react-router-dom";
import React from 'react';
import Home from './pages/Home/Home.jsx';
import Coffee from './pages/Menu/Coffee.jsx';
import NonCoffee from './pages/Menu/NonCoffee.jsx';
import Register from "./pages/Register/Register.jsx";
import Payment from './pages/Payment/Payment.jsx';
import PaymentGateway from "./pages/PaymentGateway/PaymentGateway.jsx";

function App() {
  return (
    <>
      <div className="page-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/coffee" element={<Coffee />} />
          <Route path="/non-coffee" element={<NonCoffee />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/payment-gateway" element={<PaymentGateway />} />
        </Routes>
      </div>
    </>
  );
}

export default App;

