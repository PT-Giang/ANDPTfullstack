const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

app.get("/api", (req, res) => {

  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).send("No token");
  }

  const decoded = jwt.decode(token);

  res.json({
    message: "Protected API",
    user: decoded.preferred_username
  });

});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});