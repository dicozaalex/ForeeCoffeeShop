import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';

const Login = () => {
  const isAuthenticated = useIsAuthenticated()
  const navigate = useNavigate();
  const signIn = useSignIn();
  const [inputs, setInputs] = useState({});
  const [message, setMessage] = useState('');
  const [show, setShow] = useState(false);
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${backendUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(inputs),
        credentials: 'include',
      });

      if (response.ok) {
        const res = await response.json();
        signIn({
          auth: {
            token: res.data.token,
          },
          userState: { 
            name: res.data.username,
            id: res.data.id,
          },
        });
        setMessage(res.data.message);
        setShow(true);
        setTimeout(() => {
          navigate('/branch-select');
        }, 1500);
      } else {
        const errorData = await response.json();
        setMessage(errorData.message);
        setShow(true);
      }
    } catch (error) {
      setMessage("Unknown error occurred: " + error.message);
      setShow(true);
    }
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        {show && <div className="absolute top-20 flex items-center p-4 mb-4 text-red-800 rounded-lg bg-red-50 dark:bg-white dark:text-red-400" role="alert">
          <div className="text-lg font-bold">
            {message}
          </div>
          <button type="button" className="ms-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 dark:bg-white dark:text-red-400 dark:hover:bg-gray-300" onClick={() => setShow(false)}>
            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
            </svg>
          </button>
        </div>}
        <img className='mb-5' src={`${process.env.PUBLIC_URL}/assets/logo.png`} alt="Foree Logo" width="300px" />
        <form onSubmit={handleSubmit} className="text-white w-6/12">
          <div className="mb-3">
            <label className="text-xl">
              Email
            </label>
            <div className="mt-2">
              <input
                name="email"
                type="email"
                className="block p-2 w-full rounded border-0 shadow-sm text-brand placeholder:text-brand placeholder:text-opacity-60"
                placeholder="Enter your email address"
                value={inputs.email || ''}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mb-5">
            <label className="text-xl">
              Password
            </label>
            <div className="mt-2">
              <input
                name="password"
                type="password"
                className="block p-2 w-full rounded border-0 shadow-sm text-brand placeholder:text-brand placeholder:text-opacity-60"
                placeholder="Enter your password"
                value={inputs.password || ''}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="items-center flex flex-col justify-center">
            <button type="submit" className="rounded bg-brand w-8/12 p-2 mt-10 mb-2 text-xl">Login</button>
            <span className="text-xs">Don't have an account? <Link className="underline" to="/register">Register here</Link></span>
          </div>
        </form>
      </div>
    </>
  )
}

export default Login