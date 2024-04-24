import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Order.module.css';
import NavbarCheckout from '../../components/Navbar/NavbarCheckout';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { CartContext } from '../../context/CartContext';
import { useContext } from 'react';

function OrderPickup() {
    const { cartItems, selectedBranch, getTotalPriceOfItem, getTotalPrice, addItemToCart, addItemQuantity, reduceItemQuantity, hasItemInCart, getQuantityOfItem } = useContext(CartContext);
    const auth = useAuthUser();
    return (
        <>
            <NavbarCheckout />
            <div className={styles.fullScreen}>
                <div className={styles.information}>
                    <div className={styles.infoItem}>
                        <img className={`${styles.img} ${styles.circledImage}`} src={`${process.env.PUBLIC_URL}/assets/Order/shopping-bag.png`} alt="shopping bag" />
                        <div className={styles.infoText}>
                            <span>Pickup</span>
                            <span>Pickup at the store of your choice</span>
                        </div>
                    </div>
                    <br />
                    <h1 className={styles.h1}>Take Your Order At</h1>
                    <hr style={{ border: '0', borderTop: '2px solid white', marginTop: '5px' }} />
                    <div className={styles.infoItem} style={{ marginTop: '20px' }}>
                        <img className={styles.img} src={`${process.env.PUBLIC_URL}/assets/ViewOrder/store.png`} alt="store" />
                        <div className={styles.infoText}>
                            <span>Branch</span>
                            <span>{selectedBranch}</span>
                        </div>
                    </div>
                    <div className={styles.infoItem} style={{ marginTop: '20px' }}>
                        <img className={styles.img} src={`${process.env.PUBLIC_URL}/assets/ViewOrder/user.png`} alt="user" />
                        <div className={styles.infoText}>
                            <span>Name</span>
                            <span>{auth.name}</span>
                        </div>
                    </div>
                    <hr style={{ border: '0', borderTop: '2px solid white', marginTop: '-10px', width: 'calc(100% - 60px)', marginLeft: '60px' }} />
                    <br />
                </div>
                <div className={styles.order}>
                    <div className={styles.orderHeader}>
                        <h1 className={styles.h1}>Order Details</h1>
                        <Link to="/" className={styles['addButton']}>
                            <span style={{ color: '#1C5739', margin: 'auto' }}>Add</span>
                        </Link>
                    </div>
                    <hr style={{ border: '0', borderTop: '2px solid white', marginTop: '5px' }} />
                    {cartItems.map((product, index) => (
                        <div key={index} className={styles.orderList}>
                            <div className={styles.orderName}>
                                <span>{product.name}</span>
                                <img className={styles.img} src={product.picture_url} alt="menu" />
                            </div>
                            <div className={styles.orderDetails}>
                                <div>
                                    <span>Rp {getTotalPriceOfItem(product.id)}</span>
                                </div>
                                <div className={styles.orderItems}>
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
                            </div>
                        </div>
                    ))}
                    <br />
                    <h1 className={styles.h1}>Total Payment</h1>
                    <hr style={{ border: '0', borderTop: '2px solid white', marginTop: '5px' }} />
                    <div className={styles.orderTotal}>
                        {cartItems.map((product, index) => (
                            <div key={index} className={styles.orderTotalDetails}>
                                <span className={styles.productName}>{product.name} ({product.quantity})</span>
                                <span>Rp {getTotalPriceOfItem(product.id)}</span>
                            </div>
                        ))}
                        <div className={styles.orderTotalPrice}>
                            <span>Total Price</span>
                            <span>Rp {getTotalPrice()}</span>
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