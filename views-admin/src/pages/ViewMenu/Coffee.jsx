import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';

function Coffee() {
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    const authHeader = useAuthHeader();
    const [menuItems, setMenuItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchMenuItems();
    }, []);

    const fetchMenuItems = async () => {
        try {
            const response = await fetch(`${backendUrl}/products/coffee?Branch=Griya Buah Batu`
            , {
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
            console.log("dataaa:", data.data)
            setMenuItems(data.data);
        } catch (error) {
            console.error('Error fetching menu items:', error);
        }
    };

    const handleLatestButtonClick = (productName) => {
        navigate('/edit-menu', { state: { itemName: productName } });
    }

    const handleInsertButtonClick = () => {
        navigate('/insert-menu');
    }

    const filterProductsBySubcategory = (subcategory) => {
        return menuItems.products.filter(product => product.subcategory === subcategory);
    };

    return (
        <>
            <Navbar />
            <div className="flex-col min-h-screen" style={{ backgroundColor: '#1C5739'}}>
                <h2 className="text-white text-2xl bold-text mb-4 ml-4 my-4">Flavoured Coffee</h2>
                <hr className="mx-4 my-4"></hr>
                <div className="menu-row">
                    {menuItems.products && menuItems.products.length > 0 &&
                        filterProductsBySubcategory('FLAVOURED COFFEE').map((product, index) => (
                            <div key={index} className="menu-item flex justify-between items-center mx-4 my-4">
                                <div className="menu-item flex items-center">
                                    <img src={product.picture_url} alt={product.name} width="100px"></img>
                                    <div>
                                        <h3 className="text-white text-xl ml-4">{product.name}</h3>
                                        <h3 className="text-white text-l mb-4 ml-4">Rp{product.price}</h3>
                                        <h3 className="text-white text-sm mb-4 ml-4">Current stock: {product.stock}</h3>
                                    </div>
                                </div>
                                <button className="ml-4" onClick={() => handleLatestButtonClick(product.name)}>
                                    <img src={`${process.env.PUBLIC_URL}/assets/viewmenu/pencil.png`} alt="Edit Menu" width="30px"></img>
                                </button>
                            </div> 
                        ))
                    }
                </div>
                <h2 className="text-white text-2xl bold-text mb-4 ml-4 my-4">Latte</h2>
                <hr className="mx-4 my-4"></hr>
                <div className="menu-row">
                    {menuItems.products && menuItems.products.length > 0 &&
                        filterProductsBySubcategory('LATTE').map((product, index) => (
                            <div key={index} className="menu-item flex justify-between items-center mx-4 my-4">
                                <div className="menu-item flex items-center">
                                    <img src={product.picture_url} alt={product.name} width="100px"></img>
                                    <div>
                                        <h3 className="text-white text-xl ml-4">{product.name}</h3>
                                        <h3 className="text-white text-l mb-4 ml-4">Rp{product.price}</h3>
                                        <h3 className="text-white text-sm mb-4 ml-4">Current stock: {product.stock}</h3>
                                    </div>
                                </div>
                                <button className="ml-4" onClick={() => handleLatestButtonClick(product.name)}>                                    
                                    <img src={`${process.env.PUBLIC_URL}/assets/viewmenu/pencil.png`} alt="Edit Menu" width="30px"></img>
                                </button>
                            </div> 
                        ))
                    }
                    <button className="ml-4" style={{position: 'fixed', bottom: '50px', right: '70px',}} onClick={() => handleInsertButtonClick()}>                                    
                        <img src={`${process.env.PUBLIC_URL}/assets/viewmenu/insert-menu.png`} alt="Insert New Menu" width="70px"></img>
                    </button>
                </div>
            </div>
        </>
    )
}

export default Coffee;