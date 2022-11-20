const { Router } = require("express");

// Middlewares
const {
  validatePeripheral,
  getPeripheralById,
  peripheralLimit,
} = require("../middlewares/peripheralMiddlewares");

// Controllers
const {
  getPeripherals,
  addPeripheral,
  deletePeripheral,
} = require("../controllers/peripheralController");

// Router variable
const router = Router();

// GET: /.
// Returns all Peripherals from specified gateway
router.get("/", getPeripherals);

// POST: /.
// Insert new peripheral into specified gateway
router.post("/", peripheralLimit, validatePeripheral, addPeripheral);

// DELETE: /{id}.
// Deletes peripheral from specified gateway
router.delete("/:peripheralId", getPeripheralById, deletePeripheral);

module.exports = router;
