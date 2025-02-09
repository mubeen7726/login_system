const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const cors = require("cors");
const authRouter = require("./Routes/AuthRouter");
const ProductRouter =require("./Routes/ProductRouter")
require("dotenv").config();
require("./Models/db");

const PORT = process.env.PORT || 8080;
app.get("/ping", (req, res) => {
  res.send("Pong");
});

app.use(bodyparser.json());
app.use(cors());
app.use("/auth", authRouter);
app.use("/product", ProductRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
