// Returns all peripherals from specified gateway
const getPeripherals = (req, res) => {
  res.json(req.gateway);
};

// Insert new peripheral into specified gateway
const addPeripheral = async (req, res) => {
  const { uid, vendor, status } = req.body;
  const gateway = req.gateway;
  const { id: gatewayId } = gateway;

  // Creates the peripheral object
  const peripheral = {
    uid : Number(uid),
    vendor,
    status : status ? 'online' : 'offline',
  };

  gateway.peripherals.push(peripheral);
  await gateway.save();

  res.status(201).json(peripheral);
};

// Deletes peripheral from specified gateway
const deletePeripheral = async (req, res) => {
  // Found and remove the peripheral
  const gateway = req.gateway;
  const peripheralIndex = req.peripheralIndex;

  gateway.peripherals[peripheralIndex].remove();
  await gateway.save();

  res.status(204).end();
};

module.exports = {
  getPeripherals,
  addPeripheral,
  deletePeripheral,
};
