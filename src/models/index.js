const mongoose = require("mongoose");
require('dotenv').config();

mongoose.Promise = global.Promise;

const db = {};
const db_url = process.env.DB_URL;
const url = db_url;

db.mongoose = mongoose;
db.url = url;
db.GatewayModel = require("./Gateway");
db.DeviceModel = require("./Peripheral");

module.exports = db;
