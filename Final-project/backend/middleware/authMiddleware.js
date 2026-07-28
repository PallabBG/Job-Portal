const jwt = require("jsonwebtoken");

exports.protect = (req, res, next) => {
  try {
    let token = req.headers.authorization;


    if (!token) {
      return res.status(401).json({ message: "Please login first" });
    }

    if (token.startsWith("Bearer ")) {
      token = token.split(" ")[1];
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("JWT Decoded:", decoded);

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

exports.optionalProtect = (req, res, next) => {
  try {
    let token = req.headers.authorization;

    // No token? Continue as a guest.
    if (!token) {
      return next();
    }

    if (token.startsWith("Bearer ")) {
      token = token.split(" ")[1];
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    // Invalid/expired token? Ignore it and continue as a guest.
    next();
  }
};

exports.allowRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        message: "You are not allowed to access this route",
      });
    }

    next();
  };
};