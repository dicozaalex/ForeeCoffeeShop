import React, { useState, useEffect } from 'react';
import styles from './ViewOrder.module.css';
import NavbarViewOrder from '../../components/Navbar/NavbarViewOrder';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { CartContext } from '../../context/CartContext';
import { useContext } from 'react';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';

function ViewOrderPickup() {
    const { cartItems, selectedBranch, getTotalPriceOfItem, getTotalPrice, addItemToCart, addItemQuantity, reduceItemQuantity, hasItemInCart, getQuantityOfItem } = useContext(CartContext);
    const auth = useAuthUser();
    const [transactionStatus, setTransactionStatus] = useState('');
    const [orderItems, setOrderItems] = useState([]);
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    const authHeader = useAuthHeader();

    useEffect(() => {
        // Fetch transaction status from backend when component mounts
        fetchTransactionStatus();
        // Fetch order items from the backend when component mounts
        fetchOrderItems();
    }, []);

    useEffect(() => {
        // Log the updated transactionStatus
        console.log("Updated transactionStatus:", transactionStatus);
    }, [transactionStatus]);

    const fetchTransactionStatus = async () => {
        try {
            const response = await fetch(`${backendUrl}/orders/latest-order`, {
                credentials: 'include',
                headers: {
                    'Authorization': authHeader,
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch transaction status');
            }
            const latestOrder = await response.json();
            setTransactionStatus(latestOrder.data[0].status);
        } catch (error) {
            console.error('Error fetching transaction status:', error);
        }
    };

    const fetchOrderItems = async () => {
        try {
            const response = await fetch(`${backendUrl}/orders/view-order`, {
                credentials: 'include',
                headers: {
                    'Authorization': authHeader,
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch order items');
            }
            const orderItemsData = await response.json();
            setOrderItems(orderItemsData.data);
        } catch (error) {
            console.error('Error fetching order items:', error);
        }
    };
    console.log("orderItems")
    console.log(orderItems)
    console.log(typeof orderItems)
    return (
        <>
            <NavbarViewOrder />
            <div className={styles.fullScreen}>
                <div className={styles.information}>
                    <div className={styles.infoItem}>
                        <img src={`${process.env.PUBLIC_URL}/assets/ViewOrder/user.png`} alt="user" />
                        <span>{auth.name}</span>
                    </div>
                    <div className={styles.infoItem}>
                        <img src={`${process.env.PUBLIC_URL}/assets/ViewOrder/store.png`} alt="user" />
                        <span>Dipatiukur, Bandung</span>
                    </div>
                </div>
                <br />
                <h1>Ordered Items</h1>
                <hr style={{ border: '0', borderTop: '2px solid white', marginTop: '5px' }} />
                <div className={styles.order}>
                    {orderItems.map((orderItem, index) => (
                        <div key={index} className={styles.orderItems}>
                            <img src={orderItem.picture_url} alt="product" />
                            <div>
                                <span>{orderItem.product.name}</span>
                                <div className={styles.orderDetails}>
                                    <span>Qty: {orderItem.quantity}</span>
                                    <span>{orderItem.product.price}</span>
                                    <span>{orderItem.product.price * orderItem.quantity}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                    <hr style={{ border: '0', borderTop: '2px dotted white', marginTop: '5px' }} />
                    <div className={styles.orderTotal}>
                        <span>TOTAL: </span>
                        <span>Rp {orderItems.reduce((total, item) => total + (item.product.price * item.quantity), 0)} </span>
                    </div>
                </div>
                <br />
                <br />
                <div className={styles.orderStatus}>
                    <h1>Status</h1>
                    <hr style={{ border: '0', borderTop: '2px solid white', marginTop: '5px' }} />
                    <div className={styles.statusBoxes}>
                        <div className={`${styles.statusBox} ${transactionStatus === 'ON PROGRESS' ? styles.active : ''}`}>On Progress</div>
                        <div className={`${styles.statusBox} ${transactionStatus === 'COMPLETED' ? styles.active : ''}`}>Completed</div>
                    </div>
                </div>

            </div>
        </>
    );
}

export default ViewOrderPickup;
