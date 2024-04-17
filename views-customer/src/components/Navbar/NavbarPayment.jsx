import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function NavbarPayment() {
  const location = useLocation();
  const [url, setUrl] = useState(null);
  useEffect(() => {
    setUrl(location.pathname);
    console.log(url);
  }, [location, url]);
  
  return (
    <>
      <nav className="p-5 top-0 sticky bg-white">
        <div className="flex items-center">
            <Link to="/checkout" className={"items-center flex flex-col "}>
                <img src={`${process.env.PUBLIC_URL}/assets/navbar/back.png`} alt="Back" width="50px" />
            </Link>
            <h3 className="font-bold text-3xl" style={{ color: '#1C5739', marginLeft: '15px'}}>Payment Methods</h3>
        </div>
      </nav>
    </>
  )
}

export default NavbarPayment;