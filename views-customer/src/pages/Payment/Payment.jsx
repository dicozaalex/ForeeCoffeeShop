import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Payment.module.css';

function Payment() {
  return (
    <div className={styles.fullScreen}>
        <div className="container mx-auto mt-20 text-center">
            <h1 className="text-white text-4xl font-bold mb-2">Linked Methods</h1>
            <h2 className="text-white text-2xl mb-4">TOTAL: 30,000</h2>

            <div className="w-3/4 mx-auto grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
                {/* <!-- Button 1 --> */}
                <Link to="/payment-gateway" className={styles['bg-brown-button']}>
                    <img src={`${process.env.PUBLIC_URL}/assets/cash.png`} alt="Cash" className="mr-2" width="30px" height="30px" />
                    <span>Cash</span>
                </Link>
                {/* <!-- Button 2 --> */}
                <Link to="/payment-gateway" className={styles['bg-brown-button']}>
                    <img src={`${process.env.PUBLIC_URL}/assets/shopeepay.png`} alt="Shopeepay" className="mr-2" width="30px" height="30px" />
                    <span>Shopeepay</span>
                </Link>
                {/* <!-- Button 3 --> */}
                <Link to="/payment-gateway" className={styles['bg-brown-button']}>
                    <img src={`${process.env.PUBLIC_URL}/assets/gopay.png`} alt="Gopay" className="mr-2" width="30px" height="30px" />
                    <span>Gopay</span>
                </Link>
                {/* <!-- Button 4 --> */}
                <Link to="/payment-gateway" className={styles['bg-brown-button']}>
                    <img src={`${process.env.PUBLIC_URL}/assets/ovo.png`} alt="OVO" className="mr-2" width="30px" height="30px" />
                    <span>OVO</span>
                </Link>
            </div>
        </div>
    </div>
  );
}

export default Payment;
