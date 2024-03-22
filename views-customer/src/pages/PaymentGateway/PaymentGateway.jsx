import React, { useState } from 'react';
import styles from './PaymentGateway.module.css';
import { useNavigate } from 'react-router-dom';

function PaymentGateway() {
  const navigate = useNavigate();
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);

  const handleConfirmPayment = () => {
    setPaymentConfirmed(true);
  };

  const handleViewOrder = () => {
    navigate('/view-order');
  };

  return (
    <div className={styles.fullScreen}>
        <div className={styles.container}>
            <h1 className="text-white text-4xl font-bold mb-2">Dummy Payment Gateway</h1>
            <button
                className={`${styles['bg-brown-button']} ${paymentConfirmed ? 'bg-opacity-50 cursor-not-allowed' : ''}`}
                onClick={handleConfirmPayment}
                disabled={paymentConfirmed}
            >
                {paymentConfirmed ? 'You already paid' : 'Confirm Payment'}
            </button>
            <div className="mt-4">
                <button className={`${styles['bg-brown-button']} ml-4`} onClick={handleViewOrder}>
                    View Order
                </button>
            </div>
        </div>
    </div>
  );
}

export default PaymentGateway;
