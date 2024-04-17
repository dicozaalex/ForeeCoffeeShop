import { Routes, Route } from "react-router-dom";
import React from 'react';
import InsertMenu from './pages/InsertMenu/InsertMenu.jsx';
import EditMenu from './pages/EditMenu/EditMenu.jsx';


function App() {
  return (
    <>
      {/* <div className="page-container"> */}
        <Routes>
          <Route path="/insert-menu" element={<InsertMenu />} />
          <Route path="/edit-menu" element={<EditMenu />} />
        </Routes>
      {/* </div> */}
    </>
  );
}

export default App;

