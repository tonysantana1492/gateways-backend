const db = require("../models");
const Gateway = db.GatewayModel;

// Returns all gateways and their peripherals
const getAllGateways = async (req, res) => {
  // Try to get all gateways
  try {
    const allGateways = await Gateway.find();

    res.send(allGateways);
  } catch (err) {
    // Return an error
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving gateways.",
    });
  }
};

// Insert new gateway into database
const addGateway = async (req, res) => {
  const { serial, name, ipv4 } = req.body;

  // Create a Gateway
  const gateway = new Gateway({
    serial,
    name,
    ipv4,
    peripherals: [],
  });

  // Save gateway in the database
  try {
    const data = await gateway.save();
    res.status(201).json(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Gateway.",
    });
  }
};

// Returns specified gateway with no peripherals
const getGateway = (req, res) => {
  const gateway = req.gateway;
  delete gateway.peripherals;

  res.json(gateway);
};

// Updates a gateway
const updateGateway = async (req, res) => {
  // const { serial, name, ipv4 } = req.body;
  const { id } = req.gateway;

  try {
    const updatedGateway = await Gateway.findByIdAndUpdate(id, req.body, {
      useFindAndModify: false,
    });
    res.send({ message: "Gateway was updated successfully." });
  } catch (error) {
    res.status(500).send({
      message: `Error updating Gateway with id=${id}`,
    });
  }
};

// Deletes gateway
const deleteGateway = async (req, res) => {
  const { id } = req.params;

  // Try Remove the gateway from database.
  try {
    await Gateway.deleteOne({ _id: id });

    res.status(204).send({
      message: "Gateway was deleted successfully!",
    });
  } catch (error) {
    // Return error in db
    res.status(500).send({
      message: `Could not delete Gateway with id=${id}`,
    });
  }

};

module.exports = {
  getAllGateways,
  addGateway,
  getGateway,
  updateGateway,
  deleteGateway,
};
