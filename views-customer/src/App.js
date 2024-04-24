import { Routes, Route } from "react-router-dom";
import React from 'react';
import Home from './pages/Home/Home.jsx';
import Coffee from './pages/Menu/Coffee.jsx';
import NonCoffee from './pages/Menu/NonCoffee.jsx';
import Donut from './pages/Menu/Donut.jsx';
import Register from "./pages/Register/Register.jsx";
import Payment from './pages/Payment/Payment.jsx';
import PaymentGateway from "./pages/PaymentGateway/PaymentGateway.jsx";
import ViewOrderDelivery from "./pages/ViewOrder/ViewOrderDelivery.jsx";
import ViewOrderPickup from "./pages/ViewOrder/ViewOrderPickup.jsx";
import OrderPickup from "./pages/Order/OrderPickup.jsx";
import OrderDelivery from "./pages/Order/OrderDelivery.jsx";
import { CartProvider } from './context/CartContext.jsx';
import AuthProvider from 'react-auth-kit';
import store from './store.jsx';
import Login from "./pages/Login/Login.jsx";
import AuthOutlet from '@auth-kit/react-router/AuthOutlet';
import BranchSelect from "./pages/BranchSelect/BranchSelect.jsx";


function App() {
  return (
    <AuthProvider store={store}>
      <CartProvider>
        <div className="page-container">
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route element={<AuthOutlet fallbackPath='/login' />}>
              <Route path="/" element={<Home />} />
              <Route path="/branch-select" element={<BranchSelect />} />
              <Route path="/coffee" element={<Coffee />} />
              <Route path="/non-coffee" element={<NonCoffee />} />
              <Route path="/donut" element={<Donut />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/payment-gateway" element={<PaymentGateway />} />
              <Route path="/view-order-delivery" element={<ViewOrderDelivery />} />
              <Route path="/view-order-pickup" element={<ViewOrderPickup />} />
              <Route path="/order-pickup" element={<OrderPickup />} />
              <Route path="/order-delivery" element={<OrderDelivery />} />
            </Route>
          </Routes>
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;

