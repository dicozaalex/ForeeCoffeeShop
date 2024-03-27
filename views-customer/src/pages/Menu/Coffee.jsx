import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';

function Coffee() {
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    const navigate = useNavigate();

    const handleLatestButtonClick = () => {
        navigate('/order');
    }

    return (
        <>
            <Navbar />
            <h2 className="text-white text-2xl bold-text mb-4 ml-4 my-4">Recommended</h2>
            <hr className="mx-4 my-4"></hr>
            <div class="menu-row">
                <div className="menu-item flex justify-between items-center mx-4 my-4">
                    <div class="menu-item flex items-center">
                        <img src={`${process.env.PUBLIC_URL}/assets/menu/kopi.png`} alt="Coffee 1" width="70px"></img>
                        <h3 className="text-white text-2xl mb-4 ml-4">Caffe Latte</h3>
                    </div>
                    <button className="ml-4">
                        <img src={`${process.env.PUBLIC_URL}/assets/menu/add.png`} alt="Add" width="20px"></img>
                    </button>
                </div>
                <div className="menu-item flex justify-between items-center mx-4 my-4">
                    <div class="menu-item flex items-center">
                        <img src={`${process.env.PUBLIC_URL}/assets/menu/kopi.png`} alt="Coffee 1" width="70px"></img>
                        <h3 className="text-white text-2xl mb-4 ml-4">Caffe Latte</h3>
                    </div>
                    <button className="ml-4">
                        <img src={`${process.env.PUBLIC_URL}/assets/menu/add.png`} alt="Add" width="20px"></img>
                    </button>
                </div>
                <div className="menu-item flex justify-between items-center mx-4 my-4">
                    <div class="menu-item flex items-center">
                        <img src={`${process.env.PUBLIC_URL}/assets/menu/kopi.png`} alt="Coffee 1" width="70px"></img>
                        <h3 className="text-white text-2xl mb-4 ml-4">Caffe Latte</h3>
                    </div>
                    <button className="ml-4">
                        <img src={`${process.env.PUBLIC_URL}/assets/menu/add.png`} alt="Add" width="20px"></img>
                    </button>
                </div>   
            </div>
            <h2 className="text-white text-2xl bold-text mb-4 ml-4">Latte</h2>
            <hr className="mx-4 my-4"></hr>
            <div class="menu-row">
                <div className="menu-item flex justify-between items-center mx-4 my-4">
                    <div class="menu-item flex items-center">
                        <img src={`${process.env.PUBLIC_URL}/assets/menu/kopi.png`} alt="Coffee 1" width="70px"></img>
                        <h3 className="text-white text-2xl mb-4 ml-4">Caffe Latte</h3>
                    </div>
                    <button className="ml-4">
                        <img src={`${process.env.PUBLIC_URL}/assets/menu/add.png`} alt="Add" width="20px"></img>
                    </button>
                </div>
                <div className="menu-item flex justify-between items-center mx-4 my-4">
                    <div class="menu-item flex items-center">
                        <img src={`${process.env.PUBLIC_URL}/assets/menu/kopi.png`} alt="Coffee 1" width="70px"></img>
                        <h3 className="text-white text-2xl mb-4 ml-4">Caffe Latte</h3>
                    </div>
                    <button className="ml-4">
                        <img src={`${process.env.PUBLIC_URL}/assets/menu/add.png`} alt="Add" width="20px"></img>
                    </button>
                </div>
                <div className="menu-item flex justify-between items-center mx-4 my-4">
                    <div class="menu-item flex items-center">
                        <img src={`${process.env.PUBLIC_URL}/assets/menu/kopi.png`} alt="Coffee 1" width="70px"></img>
                        <h3 className="text-white text-2xl mb-4 ml-4">Caffe Latte</h3>
                    </div>
                    <button className="ml-4">
                        <img src={`${process.env.PUBLIC_URL}/assets/menu/add.png`} alt="Add" width="20px"></img>
                    </button>
                </div>   
            </div>
            <h2 className="text-white text-2xl bold-text mb-4 ml-4">Flavoured Coffee</h2>
            <hr className="mx-4 my-4"></hr>
            <div class="menu-row">
                <div className="menu-item flex justify-between items-center mx-4 my-4">
                    <div class="menu-item flex items-center">
                        <img src={`${process.env.PUBLIC_URL}/assets/menu/kopi.png`} alt="Coffee 1" width="70px"></img>
                        <h3 className="text-white text-2xl mb-4 ml-4">Caffe Latte</h3>
                    </div>
                    <button className="ml-4">
                        <img src={`${process.env.PUBLIC_URL}/assets/menu/add.png`} alt="Add" width="20px"></img>
                    </button>
                </div>
                <div className="menu-item flex justify-between items-center mx-4 my-4">
                    <div class="menu-item flex items-center">
                        <img src={`${process.env.PUBLIC_URL}/assets/menu/kopi.png`} alt="Coffee 1" width="70px"></img>
                        <h3 className="text-white text-2xl mb-4 ml-4">Caffe Latte</h3>
                    </div>
                    <button className="ml-4">
                        <img src={`${process.env.PUBLIC_URL}/assets/menu/add.png`} alt="Add" width="20px"></img>
                    </button>
                </div>
                <div className="menu-item flex justify-between items-center mx-4 my-4">
                    <div class="menu-item flex items-center">
                        <img src={`${process.env.PUBLIC_URL}/assets/menu/kopi.png`} alt="Coffee 1" width="70px"></img>
                        <h3 className="text-white text-2xl mb-4 ml-4">Caffe Latte</h3>
                    </div>
                    <button className="ml-4">
                        <img src={`${process.env.PUBLIC_URL}/assets/menu/add.png`} alt="Add" width="20px"></img>
                    </button>
                </div>   
            </div>
            <div style={{ position: 'fixed', bottom: '40px', right: '30px', borderRadius: '50%', backgroundColor: '#368D61', padding: '10px', justifyContent: 'center', alignItems: 'center' }}>
                <button className="ml-4" onClick={handleLatestButtonClick}>
                    <img src={`${process.env.PUBLIC_URL}/assets/menu/cart.png`} alt="Cart" width="40px"></img>
                </button>
            </div>
        </>
    )
}

export default Coffee;