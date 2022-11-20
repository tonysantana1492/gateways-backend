// Validates peripheral
const validatePeripheral = (req, res, next) => {
  const { uid, vendor, status } = req.body;
  const fields = {};

  let isValid = true;

  // Validates vendor attribute
  if (!uid) {
    fields.uid = "Peripheral uid is required.";

    isValid = false;
  }

  // Validates vendor attribute
  if (!vendor) {
    fields.vendor = "Peripheral vendor is required.";

    isValid = false;
  }

  // // Validates vendor attribute
  // if (!(status === true || status === false)) {
  //   fields.status = "Peripheral status is required.";

  //   isValid = false;
  // }

  if (!isValid) {
    // Returns an error if peripheral information is not valid
    res.status(400).json({
      message: "#400: Peripheral validation error.",
      fields,
    });

    return;
  }

  next();
};

// Found one peripheral
const getPeripheralById = async (req, res, next) => {
  const { peripheralId } = req.params;
  const gateway = req.gateway;

  // Tries to found peripheral.
  const peripheralIndex = gateway.peripherals.findIndex((peripheral) => {
    return peripheral._id == peripheralId;
  });

  if (peripheralIndex === -1) {
    // Returns an error if peripheral was not found.
    res.status(404).json({
      message: "#404: Peripheral not found.",
    });

    return;
  }

  // Assigns peripheral information into request object.
  req.peripheralIndex = peripheralIndex;
  next();
};

// Determine if the gateway has enough space for storing a new peripheral
// The peripheral limit is 10
const peripheralLimit = (req, res, next) => {
  if (req.gateway.peripherals.length >= 10) {
    // Returns an error when the limit is exceeded.
    res.status(400).json({
      message: "#400: Peripheral limit exceeded.",
    });

    return;
  }

  next();
};

module.exports = {
  validatePeripheral,
  getPeripheralById,
  peripheralLimit,
};
