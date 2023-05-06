import express from "express";
import {
  addComment,
  decreaseLikes,
  deleteBlog,
  getAllBlogs,
  getSingleBlog,
  increaseLikes,
  postBlog,
  updateBlog,
} from "../controllers/blogController.js";
import { authenticationToken } from "../utils/authenticationToken.js";

const router = express.Router();

router.post("/postblog", authenticationToken, postBlog);
router.get("/blogs/all", getAllBlogs);

router
  .route("/blog/:id")
  .get(getSingleBlog)
  .delete(authenticationToken, deleteBlog)
  .put(authenticationToken, updateBlog);

router.put("/blog/:id/like", authenticationToken, increaseLikes);
router.put("/blog/:id/unlike", authenticationToken, decreaseLikes);
router.post("/blog/:id/addcomment", authenticationToken, addComment);

export default router;
