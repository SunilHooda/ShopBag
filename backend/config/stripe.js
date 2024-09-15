const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const stripeSecretKey = `${process.env.STRIPE_SECRET_KEY}`;
console.log(stripeSecretKey);

module.exports = stripe;
