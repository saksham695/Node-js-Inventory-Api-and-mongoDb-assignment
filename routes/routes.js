const express = require("express");
const app = express.Router();
const Inventory = require("../models/InventoryModel");
const Tracking = require("../models/InventoryTrackingModel");
const asyncMiddleware = require("./tryCatchMiddleware/middleware");
require("../database/mongoose");

app.get(
  "/details",
  asyncMiddleware(async (req, res) => {
    const result = await Inventory.find({});
    res.send(result);
  })
);

app.get(
  "/details/:searchBy",
  asyncMiddleware(async (req, res) => {
    const searchByItemValue = req.params.searchBy;
    const result = await Inventory.find({
      $or: [
        { inventoryType: searchByItemValue },
        { inventoryName: searchByItemValue },
        { modelName: searchByItemValue },
      ],
    });
    console.log(result);
    res.send(result);
  })
);

app.get(
  "/tracking",
  asyncMiddleware(async (req, res) => {
    const result = await Tracking.find({});
    res.send(result);
  })
);
app.get(
  "/tracking/:searchByItemValue",
  asyncMiddleware(async (req, res) => {
    const searchByItemValue = req.params.searchByItemValue;
    const result = await Tracking.find({
      $or: [
        { inventoryName: searchByItemValue },
        { modelName: searchByItemValue },
      ],
    });
    console.log(result);
    res.send(result);
  })
);

app.patch(
  "/:inventoryId",
  asyncMiddleware(async (req, res) => {
    const id = req.params.inventoryId;
    const InventoryItem = await Inventory.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        $set: {
          Quantity: req.body.Quantity,
        },
      }
    );
    const newQuantity = req.body.Quantity - InventoryItem.Quantity;
    const messageVerb = newQuantity > 0 ? "added" : "removed";
    await Tracking.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        $set: {
          updatedQuantity: req.body.Quantity,
          message: `${newQuantity} items ${messageVerb}`,
          inventoryUpdatedDate: new Date(),
        },
      },
      {
        new: true,
      }
    );
    res.send(InventoryItem);
  })
);

app.delete(
  "/:inventoryId",
  asyncMiddleware(async (req, res) => {
    const id = req.params.inventoryId;
    const result = await Inventory.findByIdAndDelete({
      _id: id,
    });
    await Tracking.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        $set: {
          updatedQuantity: 0,
          message: "Item deleted",
          inventoryUpdatedDate: new Date(),
        },
      },
      {
        new: true,
      }
    );
    res.send(result);
  })
);

app.post(
  "/",
  asyncMiddleware(async (req, res) => {
    const body = req.body;
    const inventory = new Inventory({
      inventoryType: body.inventoryType,
      inventoryName: body.inventoryName,
      modelName: body.modelName,
      Price: body.Price,
      Quantity: body.Quantity,
    });
    const inventoryResult = await inventory.save();
    const tracking = new Tracking({
      _id: inventoryResult._id,
      inventoryType: body.inventoryType,
      inventoryName: body.inventoryName,
      inventoryCreatedDate: new Date(),
      inventoryUpdatedDate: "No Update",
      modelName: body.modelName,
      updatedQuantity: 0,
    });

    await tracking.save();
    res.send(inventoryResult);
  })
);

module.exports = app;
