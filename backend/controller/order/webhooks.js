const stripe = require("stripe")(
  sk_test_51PybasCCIYRKpwABEdHCFgWTDNEpUTHQoQUJMHLrErGJyHg89uy71MyuH3qpVqnNcXJEBOs5WUdfdjh3aFbdtqyJ00GtcZFQRv
);
const orderProductModel = require("../../models/orderProductModel");
const addToCartModel = require("../../models/cartProductModel");

const endpointSecret = process.env.STRIPE_WEBHOOK_ENDPOINT_SECRET_KEY;

async function getLineItems(lineItems) {
  let AllProducts = [];

  if (lineItems?.data?.length) {
    for (const item of lineItems.data) {
      const product = await stripe.products.retrieve(item.price.product);

      const productId = product.metadata.productId;

      const productData = {
        productId: productId,
        name: product.name,
        price: item.price.unit_amount / 100,
        quantity: item.quantity,
        image: product.images,
      };
      AllProducts.push(productData);
    }
  }

  return AllProducts;
}

const webhooks = async (request, response) => {
  const sig = request.headers["stripe-signature"];

  const payloadString = JSON.stringify(request.body);

  const header = stripe.webhooks.generateTestHeaderString({
    payload: payloadString,
    secret: endpointSecret,
  });

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      payloadString,
      header,
      endpointSecret
    );
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object;

      const lineItems = await stripe.checkout.sessions.listLineItems(
        session.id
      );

      const productDetails = await getLineItems(lineItems);

      const orderDetails = {
        productDetails: productDetails,
        email: session.customer_email,
        userId: session.metadata.userId,
        paymentDetails: {
          paymentId: session.payment_intent,
          payment_method_type: session.payment_method_types,
          payment_status: session.payment_status,
        },
        shipping_options: session.shipping_options.map((s) => {
          return {
            ...s,
            shipping_amount: s.shipping_amount / 100,
          };
        }),
        totalAmount: session.amount_total / 100,
      };

      const order = new orderProductModel(orderDetails);
      const saveOrder = await order.save();

      if (saveOrder?._id) {
        const deleteCartItem = await addToCartModel.deleteMany({
          userId: session.metadata.userId,
        });
      }

      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  response.status(200).send();
};

module.exports = webhooks;
