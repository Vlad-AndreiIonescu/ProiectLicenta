const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        productId: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: "pending" },
    typePackaging: { type: String, enum: ["nastere", "cadou", "indragostitilor", "default"], default: "default"}
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
