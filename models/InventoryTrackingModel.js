const mongoose = require("mongoose");

const inventoryTrackingSchema = new mongoose.Schema({
  inventoryType: String,
  inventoryName: String,
  inventoryCreatedDate: String,
  inventoryUpdatedDate: String,
  modelName: String,
  message: String,
});

const Tracking = mongoose.model("Tracking", inventoryTrackingSchema);

module.exports = Tracking;
