const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/Inventory", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to mongo DB");
  })
  .catch(() => {
    console.log("unable to connect to mongo db");
  });
