import React from 'react';
import styles from './ViewOrder.module.css';
import NavbarViewOrder from '../../components/Navbar/NavbarViewOrder';

function ViewOrderDelivery() {
    return (
        <>
        <NavbarViewOrder />
            <div className={styles.fullScreen}>
                <div className={styles.information}>
                    <div className={styles.infoItem}>
                        <img src={`${process.env.PUBLIC_URL}/assets/ViewOrder/user.png`} alt="user" />
                        <span>Felis</span>
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
                    <div className={styles.orderItems}>
                        <img src={`${process.env.PUBLIC_URL}/assets/ViewOrder/matcha-green-tea.png`} alt="user" />
                        <div>
                            <span>Matcha Green Tea</span>
                            <div className={styles.orderDetails}>
                                <span>Qty: 2</span>
                                <span>10.000</span>
                                <span>20.000</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.orderItems}>
                        <img src={`${process.env.PUBLIC_URL}/assets/ViewOrder/strawberry-donut.png`} alt="user" />
                        <div>
                            <span>Strawberry Donut</span>
                            <div className={styles.orderDetails}>
                                <span>Qty: 1</span>
                                <span>10.000</span>
                                <span>10.000</span>
                            </div>
                        </div>
                    </div>
                    <hr style={{ border: '0', borderTop: '2px dotted white', marginTop: '5px' }} />
                    <div className={styles.orderTotal}>
                        <span>TOTAL: </span>
                        <span>30.000 </span>
                    </div>
                </div>
                <br />
                <br />
                <div className={styles.orderStatus}>
                    <h1>Status</h1>
                    <hr style={{ border: '0', borderTop: '2px solid white', marginTop: '5px' }} />
                    <div className={styles.statusBoxes}>
                        <div className={`${styles.statusBox} ${styles.active}`}>On Progress</div>
                        <div className={styles.statusBox}>On Delivery</div>
                        <div className={styles.statusBox}>Completed</div>
                    </div>
                </div>

            </div>
        </>
    );
}

export default ViewOrderDelivery;
