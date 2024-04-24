import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Payment.module.css';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { CartContext } from '../../context/CartContext';
import { useContext } from 'react';

function Payment() {
    const { cartItems, address, phoneNumber, selectedBranch, getTotalPriceOfItem, getTotalPrice, addItemToCart, addItemQuantity, reduceItemQuantity, hasItemInCart, getQuantityOfItem } = useContext(CartContext);
    const auth = useAuthUser();
  return (
    <div className={styles.fullScreen}>
        <div className="container mx-auto mt-20 text-center">
            <h1 className="text-white text-4xl font-bold mb-2">Linked Methods</h1>
            <h2 className="text-white text-2xl mb-4">TOTAL: Rp {getTotalPrice()}</h2>

            <div className="w-3/4 mx-auto grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
                {/* <!-- Button 1 --> */}
                <Link to="/payment-gateway" className={styles['bg-brown-button']}>
                    <img src={`${process.env.PUBLIC_URL}/assets/payments/shopeepay.png`} alt="Shopeepay" className="mr-2" width="30px" height="30px" />
                    <span>Shopeepay</span>
                </Link>
                {/* <!-- Button 2 --> */}
                <Link to="/payment-gateway" className={styles['bg-brown-button']}>
                    <img src={`${process.env.PUBLIC_URL}/assets/payments/gopay.png`} alt="Gopay" className="mr-2" width="30px" height="30px" />
                    <span>Gopay</span>
                </Link>
                {/* <!-- Button 3 --> */}
                <Link to="/payment-gateway" className={styles['bg-brown-button']}>
                    <img src={`${process.env.PUBLIC_URL}/assets/payments/ovo.png`} alt="OVO" className="mr-2" width="30px" height="30px" />
                    <span>OVO</span>
                </Link>
            </div>
        </div>
    </div>
  );
}

export default Payment;
