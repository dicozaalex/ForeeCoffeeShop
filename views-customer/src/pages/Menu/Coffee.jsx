import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';

function Coffee() {
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    const [menuItems, setMenuItems] = useState([]);
    const [counters, setCounters] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchMenuItems();
    }, []);

    const fetchMenuItems = async () => {
        try {
            const response = await fetch(`${backendUrl}/products/coffee?Branch=Griya Buah Batu`);
            if (!response.ok) {
                throw new Error('Failed to fetch menu items');
            }
            const data = await response.json();
            setMenuItems(data.data);
            initializeCounters(data.data);
        } catch (error) {
            console.error('Error fetching menu items:', error);
        }
    };

    const initializeCounters = (menuItemsData) => {
        const countersObj = {};
        menuItemsData.products.forEach(product => {
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
        }
    };

    const handleReduceButtonClick = (productId) => {
        setCounters(prevCounters => ({
            ...prevCounters,
            [productId]: prevCounters[productId] - 1
        }));
    };

    return (
        <>
            <Navbar />
            <div className='h-screen'>
                <h2 className="text-white text-2xl bold-text mb-4 ml-4 my-4">Recommended</h2>
                <hr className="mx-4 my-4"></hr>
                <div className="menu-row">
                {menuItems.products && menuItems.products.length > 0 &&
                    menuItems.products.map((product, index) => (
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
                {/* <h2 className="text-white text-2xl bold-text mb-4 ml-4">Latte</h2>
                <hr className="mx-4 my-4"></hr>
                <h2 className="text-white text-2xl bold-text mb-4 ml-4">Flavoured Coffee</h2>
                <hr className="mx-4 my-4"></hr> */}
                <div style={{ position: 'fixed', bottom: '50px', right: '50px', padding: '12px', borderRadius: 50, backgroundColor: '#368D61'}}>
                    <button onClick={handleLatestButtonClick}>
                        <img src={`${process.env.PUBLIC_URL}/assets/menu/cart.png`} alt="Cart" width="50px"/>
                    </button>
                </div>
            </div>
        </>
    )
}

export default Coffee;