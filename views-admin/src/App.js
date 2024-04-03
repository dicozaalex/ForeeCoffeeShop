import { BrowserRouter as Routes, Route } from "react-router-dom";
import React from 'react';
import InsertMenu from './pages/InsertMenu/InsertMenu.jsx';


function App() {
  return (
    <>
      {/* <div className="page-container"> */}
        <Routes>
          <Route path="/insert-menu" element={<InsertMenu />} />
        </Routes>
      {/* </div> */}
    </>
  );
}

export default App;

