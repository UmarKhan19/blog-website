import express from "express";
import {
  followUser,
  getAllUser,
  getFollowers,
  getFollowing,
  getFollowingBlogs,
  getLoggedInUser,
  getOwnBlogs,
  getSingleUser,
  getSingleUserBlogs,
  getSingleUserTweets,
  getUserComments,
  getUserFollowers,
  getUserFollowing,
  getUserLikedBlogs,
  getUserLikedTweets,
  loginUser,
  logoutUser,
  registerUser,
  searchUsers,
  updateUser,
} from "../controllers/userController.js";
import { authenticationToken } from "../utils/authenticationToken.js";

const router = express.Router();

router.get("/users/search/:query", searchUsers);
router.get("/user/followers", authenticationToken, getUserFollowers);
router.get("/user/:id/followers", authenticationToken, getFollowers);
router.get("/user/following", authenticationToken, getUserFollowing);
router.get("/user/:id/following", authenticationToken, getFollowing);
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
