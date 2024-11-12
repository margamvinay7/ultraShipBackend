// middlewares/auth.js
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  try {
    // for GraphQL query request
    const { query } = req.body;
    const isLoginOperation = query.includes("mutation Login");

    // Skip token validation for login
    if (isLoginOperation) {
      return next();
    }

    // remaining request
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.employee = decoded; // Attach employee data  to request
      return next();
    } else {
      throw new Error("Authorization token missing");
    }
  } catch (error) {
    console.error("Authorization error:", error);
    if (error.name === "TokenExpiredError") {
      res.status(401).json({ error: "TokenExpired" });
    } else {
      res.status(401).json({ error: "Unauthorized" });
    }
  }
};

module.exports = authMiddleware;
