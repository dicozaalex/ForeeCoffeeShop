import { Routes, Route } from "react-router-dom";
import React from 'react';
import InsertMenu from './pages/InsertMenu/InsertMenu.jsx';
import EditMenu from './pages/EditMenu/EditMenu.jsx';
import Coffee from "./pages/ViewMenu/Coffee.jsx";
import NonCoffee from "./pages/ViewMenu/NonCoffee.jsx";
import Donut from "./pages/ViewMenu/Donut.jsx";


function App() {
  return (
    <>
      {/* <div className="page-container"> */}
        <Routes>
          <Route path="/insert-menu" element={<InsertMenu />} />
          <Route path="/edit-menu" element={<EditMenu />} />
          <Route path="/coffee" element={<Coffee />} />
          <Route path="/non-coffee" element={<NonCoffee />} />
          <Route path="/donut" element={<Donut />} />
        </Routes>
      {/* </div> */}
    </>
  );
}

export default App;

