import blogModel from "../models/blogModel.js";

// POST A BLOG
export const postBlog = async (req, res) => {
  try {
    const { title, content, author, image } = req.body;

    if (!title || !content || !author || !image) {
      return res.status(400).json({
        success: false,
        message: "Please provide all the required information",
      });
    }
    await blogModel.create({ title, content, image, author });
    res
      .status(200)
      .json({ success: true, message: "Blog posted successfully!!" });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
};

// FETCHES ALL THE BLOGS
export const getAllBlogs = async function (req, res) {
  try {
    const blogs = await blogModel.find({});
    res.status(200).json({ success: true, totalBlogs: blogs.length, blogs });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
};

// FETCHES A SINGLE BLOG
export const getSingleBlog = async function (req, res) {
  try {
    const { id } = req.params;
    const blog = await blogModel.findById(id);
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
    if (!blog)
      return res
        .status(404)
        .json({ success: false, message: `No blog found with the id: ${id}` });

    blog.deleteOne();

    res
      .status(200)
      .json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
};

// UPDATES A BLOG
export const updateBlog = async function (req, res) {
  try {
    const { id } = req.params;
    const { title, content, image, author } = req.body;
    const blog = await blogModel.findById(id);
    if (!blog)
      return res
        .status(404)
        .json({ success: false, message: `No blog found with the id: ${id}` });

    if (!title || !content || !author || !image) {
      return res.status(400).json({
        success: false,
        message: "Please provide all the required information",
      });
    }

    await blog.updateOne({ title, content, image, author });

    const updatedBlog = await blogModel.findById(id);
    res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      updatedBlog,
    });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
};

// INCREASES LIKES
export const increaseLikes = async (req, res) => {
  try {
    const blog = await blogModel.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: +1 } },
      { new: true }
    );
    res.json(blog);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// DECREASES LIKES
export const decreaseLikes = async (req, res) => {
  try {
    const blog = await blogModel.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: -1 } },
      { new: true }
    );
    res.json(blog);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// ADDS COMMENT
export const addComment = async (req, res) => {
  try {
    const post = await blogModel.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const newComment = {
      author: req.body.author,
      content: req.body.content,
    };

    post.comments.push(newComment);
    await post.save();

    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
