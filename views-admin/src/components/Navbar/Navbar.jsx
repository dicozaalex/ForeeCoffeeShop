import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();
  const [url, setUrl] = useState(null);
  useEffect(() => {
    setUrl(location.pathname);
    console.log(url);
  }, [location, url]);
  
  return (
    <>
      <nav className="p-5 top-0 sticky bg-white">
        <div className="flex items-center justify-between">
            <Link to="/branch">
              <img className="m-0" src={`${process.env.PUBLIC_URL}/assets/branch.png`} alt="Branch" width="40px" />
            </Link>
            <Link to="/coffee" className={"items-center flex flex-col " + (url === "/coffee" ? "active-navbar" : "")}>
              <img className="m-0" src={`${process.env.PUBLIC_URL}/assets/Navbar/coffee-beans.png`} alt="Coffee"  width="40px"/>
              <span className="text-black font-bold text-md">COFFEE</span>
            </Link>
            <Link to="/non-coffee" className={"items-center flex flex-col " + (url === "/non-coffee" ? "active-navbar" : "")}>
              <img className="m-0" src={`${process.env.PUBLIC_URL}/assets/Navbar/leaves.png`} alt="Non-Coffee"  width="40px"/>
              <span className="text-black font-bold text-md">NON-COFFEE</span>
            </Link>
            <Link to="/donut" className={"items-center flex flex-col " + (url === "/donut" ? "active-navbar" : "")}>
              <img className="m-0" src={`${process.env.PUBLIC_URL}/assets/Navbar/donut.png`} alt="Donut"  width="40px"/>
              <span className="text-black font-bold text-md">DONUT</span>
            </Link>
        </div>
      </nav>
    </>
  )
}

export default Navbar;