const express = require("express");
const cors = require("cors");

const apiRoutes = require("./routes/api");

const app = express();

app.use(
  cors({
    origin: ["https://172.20.10.5:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());

// routes
app.use("/api", apiRoutes);

module.exports = app;
