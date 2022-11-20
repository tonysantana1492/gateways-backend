const { Router } = require("express");

// Middlewares
const {
  validateGateway,
  getGatewayBySerial,
  getGatewayById,
} = require("../middlewares/gatewayMiddlewares");

// Controllers
const {
  getAllGateways,
  addGateway,
  getGateway,
  updateGateway,
  deleteGateway,
} = require("../controllers/gatewayController");

// Router variable
const router = Router();

// GET: /.
// Returns all gateways and their peripherals
router.get("/", getAllGateways);

// POST: /.
// Returns all gateways and their peripherals
router.post("/", validateGateway, addGateway);

// GET: /{id}
// Returns specified gateway with no peripherals
router.get("/:id", getGatewayById, getGateway);

// PUT: /{id}
// Updates specified gateway
router.put("/:id", getGatewayById, validateGateway, updateGateway);

// DELETE: /{serial}
// Deletes gateway
// router.delete("/:serial", getGatewayByParam, deleteGateway);
router.delete("/:id",getGatewayById, deleteGateway);

module.exports = router;
