import jwt from "jsonwebtoken";
export const authenticationToken = (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Authentication failed. Token not provided." });
    }
    jwt.verify(token, "jwtsecretkey", (err, user) => {
      if (err) {
        return res
          .status(403)
          .json({ message: "Authentication failed. Invalid token." });
      }
      req.user = user;
      next();
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};
