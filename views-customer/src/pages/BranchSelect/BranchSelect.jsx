import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { CartContext } from '../../context/CartContext';
import { useContext } from 'react';
import useSignOut from 'react-auth-kit/hooks/useSignOut';

const BranchSelect = () => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const authHeader = useAuthHeader();
  const { selectDeliveryMethod, selectBranch, selectedBranch, deliveryMethod } = useContext(CartContext);
  const navigate = useNavigate();
  const [branch, setBranch] = useState([]);
  const signOut = useSignOut();

  useEffect(() => {
    getAllBranches();
  }, []);

  const getAllBranches = async () => {
    try {
      const response = await fetch(`${backendUrl}/branches`, {
        credentials: 'include',
        headers: {
          'Authorization': authHeader,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch branches');
      }
      const data = await response.json();
      setBranch(data.data);
    } catch (error) {
      console.error('Error fetching branch data:', error);
    }
  };

  const handleBranchChange = (e) => {
    selectBranch(e.target.value);
  };

  const handleDeliveryMethodChange = (e) => {
    selectDeliveryMethod(e.target.value);
  };

  const handleSignOut = () => {
    signOut();
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="w-80">
          <div className="flex justify-center mb-5">
            <img className="me-3" src={`${process.env.PUBLIC_URL}/assets/shop.png`} alt="Branch" width="50" height="50" />
            {branch.length > 0 && (
              <select
                className="p-1 w-full border-b-2 border-white bg-brand"
                onChange={handleBranchChange}
                style={{ backgroundColor: '#1C5739', color: 'white' }}
                value={selectedBranch}
              >
                {branch.map((option) => (
                  <option key={option.id} value={option.name}>
                    {option.name}
                  </option>
                ))}
              </select>
            )}
          </div>
          <div className="flex flex-col mb-10">
            <select
              className="p-1 border-b-2 border-white bg-brand"
              onChange={handleDeliveryMethodChange}
              style={{ backgroundColor: '#1C5739', color: 'white' }}
              value={deliveryMethod}
            >
              <option value="PICK UP">
                PICK UP
              </option>
              <option value="DELIVERY">
                DELIVERY
              </option>
            </select>
          </div>
          <div className="flex justify-around text-white">
            <button onClick={() => handleSignOut()} className="btn px-10 py-2 rounded bg-stone-500">Logout</button>
            <button onClick={() => navigate('/')} className="btn px-10 py-2 rounded bg-emerald-500">Confirm</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default BranchSelect