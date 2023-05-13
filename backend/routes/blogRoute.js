import express from "express";
import {
  addComment,
  deleteBlog,
  deleteComment,
  getAllBlogs,
  getSingleBlog,
  increaseLikes,
  postBlog,
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

router.post("/file", uploadImg);

export default router;