import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Order.module.css';

function OrderPickup() {
    return (
        <>
            <div className={styles.fullScreen}>
                <div className={styles.information}>
                    <div className={styles.infoItem}>
                        <img className={styles.circledImage} src={`${process.env.PUBLIC_URL}/assets/Order/shopping-bag.png`} alt="shopping bag" />
                        <div className={styles.infoText}>
                            <span>Pickup</span>
                            <span>Pickup at the store of your choice</span>
                        </div>
                    </div>
                    <br />
                    <h1>Take Your Order At</h1>
                    <hr style={{ border: '0', borderTop: '2px solid white', marginTop: '5px' }} />
                    <div className={styles.infoItem} style={{ marginTop: '20px' }}>
                        <img src={`${process.env.PUBLIC_URL}/assets/ViewOrder/store.png`} alt="store" />
                        <div className={styles.infoText}>
                            <span>Branch</span>
                            <span>Dipatiukur, Bandung</span>
                        </div>
                    </div>
                    <div className={styles.infoItem} style={{ marginTop: '20px' }}>
                        <img src={`${process.env.PUBLIC_URL}/assets/ViewOrder/user.png`} alt="user" />
                        <div className={styles.infoText}>
                            <span>Name</span>
                            <span>Felis</span>
                        </div>
                    </div>
                    <hr style={{ border: '0', borderTop: '2px solid white', marginTop: '-10px', width: 'calc(100% - 60px)', marginLeft: '60px' }} />
                    <br />
                </div>
                <div className={styles.order}>
                    <div className={styles.orderHeader}>
                        <h1>Order Details</h1>
                        <Link to="/coffee" className={styles['addButton']}>
                            <span style={{ color: '#1C5739', margin: 'auto' }}>Add</span>
                        </Link>
                    </div>
                    <hr style={{ border: '0', borderTop: '2px solid white', marginTop: '5px' }} />
                    <div className={styles.orderList}>
                        <div className={styles.orderName}>
                            <span>Matcha Green Tea</span>
                            <img src={`${process.env.PUBLIC_URL}/assets/ViewOrder/matcha-green-tea.png`} alt="menu" />
                        </div>
                        <div className={styles.orderDetails}>
                            <div>
                                <span>Rp 10.000</span>
                            </div>
                            <div className={styles.orderItems}>
                                <img src={`${process.env.PUBLIC_URL}/assets/Order/minus.png`} alt="minus" />
                                <span>2</span>
                                <img src={`${process.env.PUBLIC_URL}/assets/Order/plus.png`} alt="plus" />
                            </div>
                        </div>
                    </div>
                    <div className={styles.orderList}>
                        <div className={styles.orderName}>
                            <span>Strawberry Donut</span>
                            <img src={`${process.env.PUBLIC_URL}/assets/ViewOrder/strawberry-donut.png`} alt="menu" />
                        </div>
                        <div className={styles.orderDetails}>
                            <div>
                                <span>Rp 10.000</span>
                            </div>
                            <div className={styles.orderItems}>
                                <img src={`${process.env.PUBLIC_URL}/assets/Order/minus.png`} alt="minus" />
                                <span>1</span>
                                <img src={`${process.env.PUBLIC_URL}/assets/Order/plus.png`} alt="plus" />
                            </div>
                        </div>
                    </div>
                    <br />
                    <h1>Total Payment</h1>
                    <hr style={{ border: '0', borderTop: '2px solid white', marginTop: '5px' }} />
                    <div className={styles.orderTotal}>
                        <div className={styles.orderTotalPrice}>
                            <span>Price</span>
                            <span>Rp 30.000</span>
                        </div>
                        <div className={styles.orderTotalDetails}>
                            <span>Matcha Green Tea (2)</span>
                            <span>Rp 20.000</span>
                        </div>
                        <div className={styles.orderTotalDetails}>
                            <span>Strawberry Donut (1)</span>
                            <span>Rp 10.000</span>
                        </div>
                        <div className={styles.orderTotalPrice}>
                            <span>Total Price</span>
                            <span>Rp 30.000</span>
                        </div>
                    </div>
                </div>
                <Link to="/payment" className={styles['orderButton']}>
                    <span style={{ color: '#1C5739', margin: 'auto' }}>Order</span>
                </Link>
            </div>
        </>
    );
}


export default OrderPickup;