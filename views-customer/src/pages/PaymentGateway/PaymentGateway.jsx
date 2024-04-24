import React, { useState } from 'react';
import styles from './PaymentGateway.module.css';
import { useNavigate } from 'react-router-dom';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { CartContext } from '../../context/CartContext';
import { useContext } from 'react';

function PaymentGateway() {
  const { cartItems, deliveryMethod, selectedBranch, address, phoneNumber, getTotalPriceOfItem, getTotalPrice, addItemToCart, addItemQuantity, reduceItemQuantity, hasItemInCart, getQuantityOfItem } = useContext(CartContext);
  const auth = useAuthUser();
  const authHeader = useAuthHeader();
  const [inputs, setInputs] = useState({});
  const [message, setMessage] = useState('');
  const [show, setShow] = useState(false);
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const navigate = useNavigate();
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);

  const handleConfirmPayment = async (event) => {
    event.preventDefault();
    setPaymentConfirmed(true);

    if (deliveryMethod === "PICK UP") {
      // Construct the request body
      const requestBody = {
        branch_name: selectedBranch,
        product_name: cartItems.map((product) => product.name),
        quantity: cartItems.map((product) => product.quantity),
      };
      try {
        const response = await fetch(`${backendUrl}/orders/pickup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': authHeader,
          },
          body: new URLSearchParams(requestBody),
          credentials: 'include'
        });
        console.log(response);

        // console.log(requestBody);
        if (response.ok) {
          const responseData = await response.json();
          setMessage(responseData.message);
          setShow(true);
        } else {
          const errorData = await response.json();
          setMessage(errorData.error);
          setShow(true);
        }
      } catch (error) {
        setMessage("Unknown error occurred: " + error.message);
        setShow(true);
      }
    } else if (deliveryMethod === "DELIVERY"){
      // Construct the request body
      const requestBody = {
        branch_name: selectedBranch,
        phone_number: phoneNumber,
        address: address,
        product_name: cartItems.map((product) => product.name),
        quantity: cartItems.map((product) => product.quantity),
      };
      try {
        const response = await fetch(`${backendUrl}/orders`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': authHeader,
          },
          body: new URLSearchParams(requestBody),
          credentials: 'include'
        });
        console.log(response);

        // console.log(requestBody);
        if (response.ok) {
          const responseData = await response.json();
          setMessage(responseData.message);
          setShow(true);
        } else {
          const errorData = await response.json();
          setMessage(errorData.error);
          setShow(true);
        }
      } catch (error) {
        setMessage("Unknown error occurred: " + error.message);
        setShow(true);
      }
    };
  }
  const handleViewOrder = () => {
    if (deliveryMethod === 'PICK UP') {
      navigate('/view-order-pickup');
    } else if (deliveryMethod === 'DELIVERY') {
      navigate('/view-order-delivery');
    }
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
