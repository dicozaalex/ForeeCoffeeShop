import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { CartContext } from '../../context/CartContext';
import { useContext } from 'react';

function NonCoffee() {
    const { cartItems, addItemToCart, addItemQuantity, reduceItemQuantity, hasItemInCart, getQuantityOfItem, selectedBranch, deliveryMethod } = useContext(CartContext);
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    const authHeader = useAuthHeader();
    const [menuNonCoffee, setMenuNonCoffee] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchMenuNonCoffee();
    }, []);

    const fetchMenuNonCoffee = async () => {
        try {
            const response = await fetch(`${backendUrl}/products/noncoffee?Branch=${selectedBranch}`, 
            {
                credentials: 'include',
                headers: {
                    'Authorization': authHeader,
                },
            }
        );
            if (!response.ok) {
                throw new Error('Failed to fetch menu items');
            }
            const data = await response.json();
            setMenuNonCoffee(data.data);
        } catch (error) {
            console.error('Error fetching menu items:', error);
        }
    };

    const handleLatestButtonClick = () => {
        if (deliveryMethod === 'PICK UP') {
            navigate('/order-pickup');
        } else if (deliveryMethod === 'DELIVERY') {
            navigate('/order-delivery');
        }
    }

    const filterProductsBySubcategory = (subcategory) => {
        return menuNonCoffee.products.filter(product => product.subcategory === subcategory);
    };

    return (
        <>
            <Navbar />
            <div className='h-screen'>
                <h2 className="text-white text-2xl bold-text mb-4 ml-4 my-4">Chocolate</h2>
                <hr className="mx-4 my-4"></hr>
                <div className="menu-row">
                    {menuNonCoffee.products && menuNonCoffee.products.length > 0 &&
                        filterProductsBySubcategory('CHOCOLATE').map((product, index) => (
                            <div key={index} className="menu-item flex justify-between items-center mx-4 my-4">
                            <div className="menu-item flex items-center">
                                <img src={product.picture_url} alt={product.name} width="70px"></img>
                                <div>
                                    <h3 className="text-white text-xl ml-4">{product.name}</h3>
                                    <h3 className="text-white text-l mb-4 ml-4">Rp{product.price}</h3>
                                </div>
                            </div>
                            {!hasItemInCart(product.id) ? (
                                <button className="ml-4" onClick={() => addItemToCart(product)}>
                                    <img src={`${process.env.PUBLIC_URL}/assets/menu/add.png`} alt="Add" width="20px"></img>
                                </button>
                            ) : (
                                <div className="flex items-center">
                                    <button className="mr-2" onClick={() => reduceItemQuantity(product.id)}>
                                        <img src={`${process.env.PUBLIC_URL}/assets/menu/reduce.png`} alt="Reduce" width="20px"></img>
                                    </button>
                                    <div className="text-white">{getQuantityOfItem(product.id)}</div>
                                    <button className="ml-2" onClick={() => addItemQuantity(product.id)}>
                                        <img src={`${process.env.PUBLIC_URL}/assets/menu/add.png`} alt="Add" width="20px"></img>
                                    </button>
                                </div>
                            )}
                        </div> 
                        ))
                    }
                </div>
                <h2 className="text-white text-2xl bold-text mb-4 ml-4 my-4">Refresher</h2>
                <hr className="mx-4 my-4"></hr>
                <div className="menu-row">
                    {menuNonCoffee.products && menuNonCoffee.products.length > 0 &&
                        filterProductsBySubcategory('REFRESHER').map((product, index) => (
                            <div key={index} className="menu-item flex justify-between items-center mx-4 my-4">
                            <div className="menu-item flex items-center">
                                <img src={product.picture_url} alt={product.name} width="70px"></img>
                                <div>
                                    <h3 className="text-white text-xl ml-4">{product.name}</h3>
                                    <h3 className="text-white text-l mb-4 ml-4">Rp{product.price}</h3>
                                </div>
                            </div>
                            {!hasItemInCart(product.id) ? (
                                <button className="ml-4" onClick={() => addItemToCart(product)}>
                                    <img src={`${process.env.PUBLIC_URL}/assets/menu/add.png`} alt="Add" width="20px"></img>
                                </button>
                            ) : (
                                <div className="flex items-center">
                                    <button className="mr-2" onClick={() => reduceItemQuantity(product.id)}>
                                        <img src={`${process.env.PUBLIC_URL}/assets/menu/reduce.png`} alt="Reduce" width="20px"></img>
                                    </button>
                                    <div className="text-white">{getQuantityOfItem(product.id)}</div>
                                    <button className="ml-2" onClick={() => addItemQuantity(product.id)}>
                                        <img src={`${process.env.PUBLIC_URL}/assets/menu/add.png`} alt="Add" width="20px"></img>
                                    </button>
                                </div>
                            )}
                        </div> 
                        ))
                    }
                </div>
                {cartItems.length > 0 && (
                    <div style={{ position: 'fixed', bottom: '10px', left: '10px', right: '10px', padding: '12px', borderRadius: '20px', backgroundColor: '#368D61' }}>
                        <button onClick={handleLatestButtonClick} style={{ display: 'flex', alignItems: 'center', width: '100%', backgroundColor: 'transparent', border: 'none' }}>
                            <img src={`${process.env.PUBLIC_URL}/assets/menu/cart.png`} alt="Cart" width="50px" />
                            <h3 className="text-white text-xl ml-4" style={{ fontSize: '25px' }}>
                                {cartItems.reduce((total, item) => total + item.quantity, 0)} items
                            </h3>
                        </button>
                    </div>
                )}
            </div>
        </>
    )
}

export default NonCoffee;