const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.processPayment = async (req, res) => {
    const paymentIntent = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: 'npr',

        automatic_payment_methods: {
            enabled: true,
        },
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
}


exports.sendStripeKey = (req, res) => {
    return res.status(200).json({ STRIPEAPIKEY: process.env.STRIPE_API_KEY });
}