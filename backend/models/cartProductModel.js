const mongoose = require("mongoose");

const cartProductSchema = mongoose.Schema(
  {
    productId: {
      ref: "product",
      type: String,
    },
    quantity: Number,
    userId: String,
  },
  {
    timestamps: true,
  }
);

const addToCartModel = mongoose.model("cartProduct", cartProductSchema);

module.exports = addToCartModel;
