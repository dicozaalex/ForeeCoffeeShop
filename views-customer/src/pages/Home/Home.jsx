import React from 'react';
import Navbar from '../../components/navbar/Navbar';

function Home() {
  return (
    <>
      <Navbar />
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
      <h1 className="test-class">
        Hello world!
      </h1>
    </>
  )

}

export default Home;