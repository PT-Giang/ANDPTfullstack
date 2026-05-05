// Protected API
const getPrivate = (req, res) => {
  res.json({
    message: "Protected API",
    user: req.user.preferred_username,
    roles: req.user.realm_access?.roles,
  });
};

// Public API
const getPublic = (req, res) => {
  console.log("React đã gọi tới server!");
  res.json({ message: "Connected OK" });
};

module.exports = {
  getPrivate,
  getPublic,
};
