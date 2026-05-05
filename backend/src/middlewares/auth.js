const jwt = require("jsonwebtoken");
const getKey = require("../config/keycloak");

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).send("No token");
  }

  jwt.verify(token, getKey, {}, (err, decoded) => {
    if (err) {
      return res.status(401).send("Invalid token");
    }

    req.user = decoded; // lưu user để dùng tiếp
    next();
  });
};

module.exports = verifyToken;
