const mongoose = require("mongoose");

// Define a Device Schema
const peripheralSchema = new mongoose.Schema({
  uid: {
    type: Number,
    required: true,
    description: "UID a Number",
    example: "123456",
  },
  vendor: {
    type: String,
    required: true,
    maxLength: 40,
    description: "vendor",
    example: "Vendor 24",
  },
  date: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["online", "offline"],
    default: "online",
    description: "Peripheral status online/offline.",
  },
});

peripheralSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = { peripheralSchema };
