import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import Navbar from '../../components/Navbar/Navbar';
import { useContext } from 'react';
import { BranchContext } from '../../context/BranchContext';

const Branch = () => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const authHeader = useAuthHeader();
  const navigate = useNavigate();
  const [branchData, setBranchData] = useState([]);
  const [inputs, setInputs] = useState({
    name: "Trans Studio Mall Bandung",
    address: "Jl. Gatot Subroto No.289"
  });
  const { setSelectedBranch } = useContext(BranchContext);
  const [selectedBranchId, setSelectedBranchId] = useState(4001);
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
      setBranchData(data.data);
    } catch (error) {
      console.error('Error fetching branch data:', error);
    }
  };

  const handleBranchChange = (e) => {
    const selectedBranchId = e.target.value;
    setSelectedBranchId(selectedBranchId);

    const selectedBranch = branchData.find((branch) => branch.id == selectedBranchId);
    if (selectedBranch) {
      setInputs({
        name: selectedBranch.name,
        address: selectedBranch.address,
      });
      setSelectedBranch(selectedBranch.name);
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs(values => ({ ...values, [name]: value }))
  }

  const handleSave = async () => {
    try {
      const response = await fetch(`${backendUrl}/branches/${selectedBranchId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': authHeader,
        },
        body: new URLSearchParams(inputs),
        credentials: 'include',
      });

      if (response.ok) {
        const res = await response.json();
        alert(res.message);
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        const errorData = await response.json();
        alert(errorData);
      }
    } catch (error) {
      alert(error);
    }
  };

  const deleteBranch = async () => {
    try {
      const response = await fetch(`${backendUrl}/branches/${selectedBranchId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': authHeader,
        },
        credentials: 'include',
      });

      if (response.ok) {
        const res = await response.json();
        alert(res.message);
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        const errorData = await response.json();
        alert(errorData);
      }
    } catch (error) {
      alert(error);
    }
  };

  const handleSignOut = () => {
    signOut();
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="w-80 flex flex-col items-center">
          <div className="flex justify-center mb-5">
            {branchData.length > 0 && (
              <div className="flex flex-col text-white">
                <div className="flex mb-5">
                  <img className="me-3" src={`${process.env.PUBLIC_URL}/assets/shop.png`} alt="Branch" width="50" height="50" />
                  <select
                    className="p-1 w-full border-b-2 border-white bg-brand"
                    onChange={handleBranchChange}

                    style={{ backgroundColor: '#1C5739', color: 'white' }}
                    value={selectedBranchId}
                  >
                    {branchData.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label className="text-xl">
                    Branch Name
                  </label>
                  <div className="mt-2">
                    <input
                      name="name"
                      type="text"
                      className="block p-2 w-full rounded border-0 shadow-sm text-brand placeholder:text-brand placeholder:text-opacity-60"
                      value={inputs.name}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="mb-5">
                  <label className="text-xl">
                    Address
                  </label>
                  <div className="mt-2">
                    <input
                      name="address"
                      type="text"
                      className="block p-2 w-full rounded border-0 shadow-sm text-brand placeholder:text-brand placeholder:text-opacity-60"
                      value={inputs.address}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-col justify-center w-8/12 text-white">
            <button onClick={() => handleSave()} className="btn px-5 py-2 mb-3 rounded bg-brand">Save Changes</button>
            <button onClick={() => deleteBranch()} className="btn px-5 py-2 mb-10 rounded bg-red-500">Delete Branch</button>
            <button onClick={() => handleSignOut()} className="btn px-5 py-2 rounded bg-stone-500">Logout</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Branch