import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <>
      <nav className="bg-white p-5">
        <div className="flex justify-between">
          <div className="flex flex-col items-center">
            <img src={`${process.env.PUBLIC_URL}/assets/logo.png`} alt="Foree Logo" width="50px"></img>
          </div>
          <div className="flex flex-col items-center">
            <img src={`${process.env.PUBLIC_URL}/assets/coffee-beans.png`} alt="Coffee" width="30px"></img>
              <Link to="/coffee" className="text-black font-bold text-lg">Coffee</Link>
          </div>
          <div className="flex flex-col items-center">
            <img src={`${process.env.PUBLIC_URL}/assets/leaves.png`} alt="Non-Coffee" width="30px"></img>
              <Link to="/non-coffee" className="text-black font-bold text-lg">Non-coffee</Link>
          </div>
          <div className="flex flex-col items-center">
            <img src={`${process.env.PUBLIC_URL}/assets/donut.png`} alt="Donut" width="30px"></img>
              <Link to="/donut" className="text-black font-bold text-lg">Donut</Link>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar;