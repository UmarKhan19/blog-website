import express from "express";
import {
  addCommentToTweet,
  deleteTweet,
  getAllTweets,
  getSingleTweet,
  likeTweet,
  postTweet,
} from "../controllers/tweetController.js";
import { authenticationToken } from "../utils/authenticationToken.js";

const router = express.Router();

router.post("/posttweet", authenticationToken, postTweet);
router.put("/tweet/like/:id", authenticationToken, likeTweet);
router.get("/tweets", getAllTweets);
router.get("/tweet/:id", getSingleTweet);
router.put("/tweet/comment/:id", authenticationToken, addCommentToTweet);
router.delete("/tweet/comment/delete/:id", authenticationToken, deleteTweet);

export default router;
