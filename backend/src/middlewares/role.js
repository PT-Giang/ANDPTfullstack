const checkRole = (role) => {
  return (req, res, next) => {
    const roles = req.user?.realm_access?.roles || [];

    if (roles.includes(role)) {
      next();
    } else {
      return res.status(403).json({
        message: "Forbidden - You do not have permission",
      });
    }
  };
};

module.exports = checkRole;
