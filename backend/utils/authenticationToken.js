import jwt from "jsonwebtoken";
import User from "../models/userSchema.js";

export const authenticationToken = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Authentication failed. Token not provided." });
    }

    const decodedToken = jwt.verify(token, "jwtsecretkey");
    const userId = decodedToken.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    req.user = user;
    next();
  } catch (error) {
    return res
      .status(403)
      .json({ message: "Authentication failed. Invalid token." });
  }
};
