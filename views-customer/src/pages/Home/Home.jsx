import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import SignOutComponent from '../../components/Logout/Logout';

function Home() {
  return (
    <>
      <Navbar />
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
      <SignOutComponent />
    </>
  )

}

export default Home;