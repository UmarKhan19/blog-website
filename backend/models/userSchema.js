import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    blogLikes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Blog" }],
    tweetLikes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tweet" }],
    blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Blog" }],
    tweets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tweet" }],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    profilePicture: {
      type: String,
      default: "default.png",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
