import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import { CheckoutForm } from "../../components";
import { getStripeKey, makePayment } from "../../api/payment.api";

const Payment = () => {
  let [stripeKey, setStripeKey] = useState('');
  let [clientSecret, setClientSecret] = useState()

  useEffect(() => {
    getStripeKey()
      .then(data => {
        setStripeKey(data.STRIPEAPIKEY)
      })

    let amount = sessionStorage.getItem('total') * 100;
    makePayment(amount)
      .then(data => {
        setClientSecret(data.clientSecret)
      });
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div>
      {stripeKey && clientSecret && (
        <Elements options={options} stripe={loadStripe(stripeKey)}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}

export default Payment;