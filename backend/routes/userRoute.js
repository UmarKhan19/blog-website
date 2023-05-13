import express from "express";
import {
  followUser,
  getAllUser,
  getFollowingBlogs,
  getLoggedInUser,
  getOwnBlogs,
  getSingleUser,
  getSingleUserBlogs,
  getSingleUserTweets,
  getUserComments,
  getUserLikedBlogs,
  getUserLikedTweets,
  loginUser,
  logoutUser,
  registerUser,
  updateUser,
} from "../controllers/userController.js";
import { authenticationToken } from "../utils/authenticationToken.js";

const router = express.Router();

router.post("/user/register", registerUser);
router.get("/user/myblogs", authenticationToken, getOwnBlogs);
router.get("/user/:id", getSingleUser);
router.get("/users", getAllUser);
router.get("/user", authenticationToken, getLoggedInUser);
router.post("/user/login", loginUser);
router.post("/user/logout", logoutUser);
router.put("/user/update", authenticationToken, updateUser);
router.post("/user/follow/:id", authenticationToken, followUser);
router.get("/user/blog/:id", authenticationToken, getSingleUserBlogs);
router.get("/user/tweet/:id", authenticationToken, getSingleUserTweets);
router.get("/user/tweet/like/:id", authenticationToken, getUserLikedTweets);
router.get("/user/blog/like/:id", authenticationToken, getUserLikedBlogs);
router.get("/user/comment/:id", authenticationToken, getUserComments);
router.get("/blogs/following", authenticationToken, getFollowingBlogs);

export default router;
