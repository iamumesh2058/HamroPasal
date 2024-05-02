import React, { useEffect, useState } from 'react';
import { isAuthenticated } from '../../api/user.api';
import { placeOrder } from '../../api/order.api';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import "./PaymentSuccess.scss";

const PaymentSuccess = () => {
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const user = isAuthenticated();
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const order = {
      orderItems: cartItems,
      user: user._id,
      ...shippingInfo,
    }

    const placingOrder = async () => {
      await placeOrder(order)
        .then(data => {
          if (data.error) {
            toast.error(data.error);
          }
          else {
            toast.success(data.msg);
            setSuccess(true);
            localStorage.removeItem('cartItems');
            return navigate('/');
          }
        })
    }
    !success && placingOrder();
  }, []);

  return (
    <>
      {
        !success &&
        <div className="wrapper">
          <div className='spinner'>
            Placing Order
          </div>
        </div>
      }
    </>
  )
}

export default PaymentSuccess;