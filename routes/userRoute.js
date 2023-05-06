import express from "express";
import {
  getAllUser,
  getSingleUser,
  loginUser,
  logoutUser,
  registerUser,
  updateUser,
} from "../controllers/userController.js";
import { authenticationToken } from "../utils/authenticationToken.js";

const router = express.Router();

router.post("/user/register", registerUser);
router.get("/user/:id", getSingleUser);
router.get("/users", getAllUser);
router.post("/user/login", loginUser);
router.post("/user/logout", logoutUser);
router.put("/user/update", authenticationToken, updateUser);

export default router;
