import { Routes, Route } from "react-router-dom";
import React from 'react';
import InsertMenu from './pages/InsertMenu/InsertMenu.jsx';
import EditMenu from './pages/EditMenu/EditMenu.jsx';
import Coffee from "./pages/ViewMenu/Coffee.jsx";
import NonCoffee from "./pages/ViewMenu/NonCoffee.jsx";
import Donut from "./pages/ViewMenu/Donut.jsx";
import AuthProvider from 'react-auth-kit';
import store from "./store.jsx";
import Login from "./pages/Login/Login.jsx";
import AuthOutlet from '@auth-kit/react-router/AuthOutlet';
import Branch from "./pages/Branch/Branch.jsx";
import { BranchProvider } from "./context/BranchContext.jsx";

function App() {
  return (
    <AuthProvider store={store}>
      <BranchProvider>
        <div className="page-container">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route element={<AuthOutlet fallbackPath='/' />}>
              <Route path="/branch" element={<Branch />} />
              <Route path="/insert-menu" element={<InsertMenu />} />
              <Route path="/edit-menu" element={<EditMenu />} />
              <Route path="/coffee" element={<Coffee />} />
              <Route path="/non-coffee" element={<NonCoffee />} />
              <Route path="/donut" element={<Donut />} />
            </Route>
          </Routes>
        </div>
      </BranchProvider>
    </AuthProvider>
  );
}

export default App;

