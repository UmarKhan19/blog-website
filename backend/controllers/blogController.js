import blogModel from "../models/blogModel.js";
import User from "../models/userSchema.js";
import Comment from "../models/commentSchema.js";
import Tweet from "../models/tweetSchema.js";

// POST A BLOG
export const postBlog = async (req, res) => {
  try {
    const { title, content, image } = req.body;
    console.log(req.user);

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Please provide all the required information",
      });
    }
    const blogPost = new blogModel({
      title,
      content,
      image,
      author: req.user,
    });

    await blogPost.save();

    await User.findByIdAndUpdate(req.user._id, {
      $push: { blogs: blogPost },
    });
    res
      .status(200)
      .json({ success: true, message: "Blog posted successfully!!", blogPost });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
};

// FETCHES ALL THE BLOGS
export const getAllBlogs = async function (req, res) {
  try {
    const blogs = await blogModel.find({}).populate("author");
    res.status(200).json({ success: true, totalBlogs: blogs.length, blogs });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
};

// FETCHES A SINGLE BLOG
export const getSingleBlog = async function (req, res) {
  try {
    const { id } = req.params;
    const blog = await blogModel.findById(id).populate("author");
    if (!blog)
      return res
        .status(404)
        .json({ success: false, message: `No blog found with the id: ${id}` });

    res.status(200).json({ success: true, blog });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
};

// DELETES A BLOG
export const deleteBlog = async function (req, res) {
  try {
    const { id } = req.params;
    const blog = await blogModel.findById(id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: `No blog found with the id: ${id}`,
      });
    }

    // Check if the authenticated user is the author of the blog
    if (blog.author.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: "You are not authorized to delete this blog.",
      });
    }

    await blog.deleteOne();

    res
      .status(200)
      .json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

// UPDATES A BLOG
export const updateBlog = async function (req, res) {
  try {
    const { id } = req.params;
    const { title, content, image } = req.body;

    const blog = await blogModel.findById(id);
    if (!blog)
      return res
        .status(404)
        .json({ success: false, message: `No blog found with the id: ${id}` });

    if (blog.author.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access. You are not the author of this blog.",
      });
    }

    if (!title || !content || !image) {
      return res.status(400).json({
        success: false,
        message: "Please provide all the required information",
      });
    }

    blog.title = title;
    blog.content = content;
    blog.image = image;

    await blog.save();

    res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      updatedBlog: blog,
    });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
};

// LIKE/UNLIKE BLOG
export const increaseLikes = async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = req;

    const blog = await blogModel.findById(id);
    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }

    const userLiked = blog.likes.includes(user._id);

    if (userLiked) {
      // Unlike the blog
      blog.likes.pull(user._id);
      user.blogLikes.pull(id);
    } else {
      // Like the blog
      blog.likes.push(user._id);
      user.blogLikes.push(id);
    }

    await blog.save();
    await user.save();

    res.status(200).json({
      success: true,
      message: `Blog ${userLiked ? "unliked" : "liked"} successfully`,
      blog,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ADDS COMMENT
export const addComment = async (req, res) => {
  try {
    const { content } = req.body;
    const { id } = req.params;

    // Find the blog post
    const blog = await blogModel.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog post not found" });
    }

    // Create the comment
    const comment = new Comment({
      author: req.user,
      content,
      parentType: "blog",
      parentId: blog._id,
    });

    // Save the comment
    await comment.save();

    // Add the comment to the user's "comments" array
    const user = await User.findById(req.user._id);
    console.log(user);
    user.comments.push(comment);
    await user.save();

    // Add the comment to the blog post
    console.log(blog);
    blog.comments.push(comment);
    await blog.save();

    res.json({ success: true, message: "Comment added successfully", comment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// DELETE COMMENT
export const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = req;

    const comment = await Comment.findById(id);

    if (!comment) {
      return res
        .status(404)
        .json({ success: false, message: "Comment not found" });
    }

    // Check if the authenticated user is the author of the comment
    if (comment.author.toString() !== user._id.toString()) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    const { parentType, parentId } = comment;

    // Remove the comment from the user's comment array
    await User.findByIdAndUpdate(user._id, {
      $pull: { comments: comment._id },
    });

    // Remove the comment from the associated tweet or blog
    if (parentType === "tweet") {
      await Tweet.findByIdAndUpdate(parentId, {
        $pull: { comments: comment._id },
      });
    } else if (parentType === "blog") {
      await blogModel.findByIdAndUpdate(parentId, {
        $pull: { comments: comment._id },
      });
    }

    await comment.deleteOne();

    res
      .status(200)
      .json({ success: true, message: "Comment deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// UPLOAD IMAGE
export const uploadImg = (req, res) => {
  try {
    const file = req.file;
    if (!file)
      return res
        .status(404)
        .json({ success: false, message: "No file provided" });
    res.status(200).json({ success: true, message: "YEAH!!!!!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
