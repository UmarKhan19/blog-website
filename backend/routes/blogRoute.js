import express from "express";
import {
  addComment,
  deleteBlog,
  deleteComment,
  getAllBlogs,
  getBlogComment,
  getSingleBlog,
  increaseLikes,
  postBlog,
  searchBlogs,
  updateBlog,
  uploadImg,
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
router.post("/blog/:id/addcomment", authenticationToken, addComment);
router.delete("/comment/delete/:id", authenticationToken, deleteComment);
router.get("/blog/:blogId/comments", getBlogComment);
router.post("/file", uploadImg);
router.get("/blogs/search/:query", searchBlogs);

export default router;
