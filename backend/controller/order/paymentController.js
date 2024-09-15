const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const userModel = require("../../models/userModel");

const paymentController = async (request, response) => {
  try {
    const { cartItems } = request.body;

    const user = await userModel.findOne({ _id: request.userId });

    const params = {
      submit_type: "pay",
      mode: "payment",
      payment_method_types: ["card"],
      billing_address_collection: "auto",
      shipping_options: [
        {
          shipping_rate: "shr_1Pyc8qCCIYRKpwABFpCQij37",
        },
      ],
      customer_email: user.email,
      metadata: {
        userId: request.userId,
      },
      line_items: cartItems.map((item, index) => {
        // Ensure the price is in the smallest currency unit (paise)
        const unitAmount = Math.round(item.productId.sellingPrice * 100);
        return {
          price_data: {
            currency: "inr",
            product_data: {
              name: item.productId.productName,
              images: item.productId.productImage,
              metadata: {
                productId: item.productId._id,
              },
            },
            unit_amount: unitAmount,
          },
          adjustable_quantity: {
            enabled: true,
            minimum: 1,
          },
          quantity: item.quantity,
        };
      }),
      success_url: `${process.env.FRONTEND_URL}/success`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    };

    const session = await stripe.checkout.sessions.create(params);

    response.status(303).json(session);
  } catch (err) {
    response.json({
      message: `Payment Controller error ${err.message}` || err,
      error: true,
      success: false,
    });
  }
};

module.exports = paymentController;
