export const getStripeKey = () => {
  return fetch(`api/payment/getstripekey`)
    .then(res => res.json())
    .catch(err => console.log(err))
}

export const makePayment = (amount) => {
  return fetch(`api/payment/processpayment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ amount })
  })
    .then(res => res.json())
    .catch(err => console.log(err))
}