const mongoose = require("mongoose");
const { peripheralSchema } = require("./Peripheral");

// Define a Gateway Schema
const gatewaySchema = new mongoose.Schema({
  serial: {
    type: String,
    maxLength: 40,
    description: 'a unique serial number',
    example: '2C0F24C2-B53C-49A7-8478-D10915A5B1DF',
  },
  name: {
    type: String,
    maxLength: 40,
    description: 'human-readable name',
    example: 'My Preferred Gateway',
  },
  ipv4: {
    type: String,
    description: 'String representation of ipv4 address',
    example: '127.0.0.1'
  },
  peripherals: [peripheralSchema],
});

gatewaySchema.method("toJSON", function() {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

// Define a Gateway Model
const gatewayModel = mongoose.model("Gateway", gatewaySchema);



module.exports = gatewayModel;
