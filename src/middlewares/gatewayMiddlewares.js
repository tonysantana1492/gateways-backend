const db = require("../models");
const Gateway = db.GatewayModel;

// This function validates if a given string is a valid Ipv4 address or not
const isIpv4 = (str) => {
  // Ipv4 regular expression
  const addr = /^(\d{1,3}\.){3}\d{1,3}$/;

  if (!addr.test(str)) return false;

  let isValid = true;

  // Ensure that all octets are between 0 and 255
  str.split(".").forEach((element) => {
    if (element < 0 || element > 255) {
      isValid = false;

      return false;
    }
  });

  return isValid;
};

// Found gateway by Serial
const getGatewayBySerial = async (req, res, next) => {
  const { serial } = req.params;

  try {
    const gateway = await Gateway.findOne({ serial: serial });
    req.gateway = gateway;

    next();
  } catch (error) {
    // Returns an error if gateway was not found
    res.status(404).json({
      message: "#404: Gateway not found.",
    });

    return;
  }
};

// Found gateway by id
const getGatewayById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const gateway = await Gateway.findById(id);
    req.gateway = gateway;

    next();
  } catch (error) {
    // Returns an error if gateway was not found
    res.status(404).json({
      message: "#404: Gateway not found.",
    });

    return;
  }
};

// Validates gateway
const validateGateway = async (req, res, next) => {
  const { serial, name, ipv4 } = req.body;
  const fields = {};

  let isValid = true;

  // Validates vendor attribute
  if (!serial) {
    fields.serial = "Gateway serial is required.";
    isValid = false;
  } else {
    // Tries to found gateway with the same serial
    const exist = await Gateway.findOne({ serial: serial });

    if (exist) {
      const method = req.method;

      // Validates if there is another gateway with the same serial

      if (
        method == "POST" ||
        // (method == "PUT" && serial != req.params.serial)
        (method == "PUT" && exist.id != req.params.id)
      ) {
        fields.serial = "Gateway serial already exist.";
        isValid = false;
      }
    }
  }

  // Validates name attribute
  if (!name) {
    fields.name = "Gateway name is required.";

    isValid = false;
  }

  // Validates ipv4 attribute format
  if (!isIpv4(ipv4)) {
    fields.ipv4 = "Invalid IPv4 format.";

    isValid = false;
  }

  if (!isValid) {
    // Returns an error if gateway information is not valid
    res.status(400).json({
      message: "#400: Gateway validation error.",
      fields,
    });

    return;
  }

  next();
};

module.exports = {
  getGatewayById,
  validateGateway,
  getGatewayBySerial,
};
