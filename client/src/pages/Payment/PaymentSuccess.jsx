import React, { useEffect } from 'react';
import { isAuthenticated } from '../../api/user.api';
import { placeOrder } from '../../api/order.api';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';  

const PaymentSuccess = () => {
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const user = isAuthenticated();

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
          }
        })
    }
    placingOrder();
  }, []);

  return (
    <div>PaymentSuccess</div>
  )
}

export default PaymentSuccess;