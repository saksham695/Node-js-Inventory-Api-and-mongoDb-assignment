const express = require("express");
const routes = require("./routes/routes");
require("./database/mongoose");

const app = express();

app.use(express.json());

app.use("/inventory", routes);

app.listen(8000, () => {
  console.log("Server is up on port 8000");
});
