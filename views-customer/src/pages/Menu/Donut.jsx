import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';

function Donut() {
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    const authHeader = useAuthHeader();
    const [menuDonut, setMenuDonut] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [counters, setCounters] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchMenuDonut();
    }, []);

    const fetchMenuDonut = async () => {
        try {
            const response = await fetch(`${backendUrl}/products/donut?Branch=Griya Buah Batu`, {
                credentials: 'include',
                headers: {
                    'Authorization': authHeader,
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch menu items');
            }
            const data = await response.json();
            setMenuDonut(data.data);
            initializeCounters(data.data);
        } catch (error) {
            console.error('Error fetching menu items:', error);
        }
    };

    const initializeCounters = (menuDonutsData) => {
        const countersObj = {};
        menuDonutsData.products.forEach(product => {
            countersObj[product.id] = 0;
        });
        setCounters(countersObj);
    };

    const handleLatestButtonClick = () => {
        navigate('/order');
    }

    const handleAddButtonClick = (productId, maxStock) => {
        if (counters[productId] < maxStock) {
            setCounters(prevCounters => ({
                ...prevCounters,
                [productId]: prevCounters[productId] + 1
            }));
            const selectedItem = menuDonut.products.find(product => product.id === productId);
            setCartItems(prevCartItems => [...prevCartItems, selectedItem]);
        }
    };

    const handleReduceButtonClick = (productId) => {
        setCounters(prevCounters => ({
            ...prevCounters,
            [productId]: prevCounters[productId] - 1
        }));
        const updatedCartItems = cartItems.filter(item => item.id !== productId);
        setCartItems(updatedCartItems);
    };

    return (
        <>
            <Navbar />
            <div className='h-screen'>
                <h2 className="text-white text-2xl bold-text mb-4 ml-4 my-4">Donuts</h2>
                <hr className="mx-4 my-4"></hr>
                <div className="menu-row">
                {menuDonut.products && menuDonut.products.length > 0 &&
                    menuDonut.products.map((product, index) => (
                        <div key={index} className="menu-item flex justify-between items-center mx-4 my-4">
                            <div className="menu-item flex items-center">
                                <img src={product.picture_url} alt={product.name} width="70px"></img>
                                <div>
                                    <h3 className="text-white text-xl ml-4">{product.name}</h3>
                                    <h3 className="text-white text-l mb-4 ml-4">Rp{product.price}</h3>
                                </div>
                            </div>
                            {counters[product.id] === 0 ? (
                                <button className="ml-4" onClick={() => handleAddButtonClick(product.id, product.stock)}>
                                    <img src={`${process.env.PUBLIC_URL}/assets/menu/add.png`} alt="Add" width="20px"></img>
                                </button>
                            ) : (
                                <div className="flex items-center">
                                    <button className="mr-2" onClick={() => handleReduceButtonClick(product.id)}>
                                        <img src={`${process.env.PUBLIC_URL}/assets/menu/reduce.png`} alt="Reduce" width="20px"></img>
                                    </button>
                                    <div className="text-white">{counters[product.id]}</div>
                                    <button className="ml-2" onClick={() => handleAddButtonClick(product.id, product.stock)}>
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
                                    <h3 className="text-white text-xl ml-4" style={{ fontSize: '25px' }}>{cartItems.length} items</h3>
                            </button>
                    </div>
                )}
            </div>
        </>
    )
}

export default Donut;