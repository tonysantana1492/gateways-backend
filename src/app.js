const express = require("express");
const cors = require("cors");

const gatewayRoutes = require("./routes/gatewayRoutes");
const peripheralRoutes = require("./routes/peripheralRoutes");
const { getGatewayById } = require("./middlewares/gatewayMiddlewares");
require('dotenv').config();

// App variables
const app = express();
const PORT = process.env.PORT || 5000;
const corsOptions = {
  origin: "*",
};

// App configuration
app.set("port", PORT);
app.disable("x-powered-by");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));



// Routes definitions
app.use("/api/gateways", gatewayRoutes);
app.use("/api/gateways/:id/peripherals", getGatewayById, peripheralRoutes);

module.exports = app;