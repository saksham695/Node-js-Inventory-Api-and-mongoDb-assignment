const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
  inventoryType: String,
  inventoryName: String,
  modelName: String,
  Price: Number,
  Quantity: Number,
});

const Inventory = mongoose.model("inventory", inventorySchema);

module.exports = Inventory;
