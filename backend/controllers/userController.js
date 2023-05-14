import User from "../models/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Tweet from "../models/tweetSchema.js";
import blogModel from "../models/blogModel.js";
import Comment from "../models/commentSchema.js";

// REGISTER USER
export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the username or email already exists
    const existingUser = await User.findOne().or([{ username }, { email }]);

    if (existingUser) {
      return res
        .status(409)
        .json({ message: "Username or email already exists" });
    }

    // Check if the email is from "@cuchd.in" domain
    if (!email.endsWith("@cuchd.in")) {
      return res.status(400).json({
        message: "Invalid email domain. Only @cuchd.in emails are allowed",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // Generate a token for the user
    const token = jwt.sign({ userId: user._id }, "jwtsecretkey");

    // Set the token as a cookie in the response
    res.cookie("token", token, { httponly: false });

    // Return a success message or user data
    res.json({ message: "User registered successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// FETCH SINGLE USER
export const getSingleUser = async function (req, res) {
  const { id } = req.params;

  const user = await User.findById(id).populate("blogs");

  if (!user)
    return res
      .status(404)
      .json({ success: false, message: `No user found with id : ${id}` });

  res.status(200).json({ success: true, user });
};

// FETCH ALL USERS
export const getAllUser = async function (req, res) {
  try {
    const users = await User.find({});
    res.status(200).json({ success: true, totalUsers: users.length, users });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
};

// LOGIN USER
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(404).json({ message: "Invalid credentials" });
    }

    // Compare the provided password with the stored password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    // Generate a token for the user
    const token = jwt.sign({ userId: user._id }, "jwtsecretkey");

    // Set the token as a cookie in the response
    res.cookie("token", token, { httponly: false });

    // Return a success message or user data
    res.json({ message: "User logged in successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// LOGOUT USER
export const logoutUser = (req, res) => {
  try {
    if (!req.cookies.token) {
      return res
        .status(400)
        .json({ success: false, message: "No user is logged in." });
    }

    // Clear the token cookie
    res.clearCookie("token");

    res
      .status(200)
      .json({ success: true, message: "Logged out successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while logging out.",
    });
  }
};

// UPDATE USER EMAIL OR USERNAME
export const updateUser = async (req, res) => {
  try {
    const { username, email } = req.body;
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (username && username.length < 4) {
      return res
        .status(400)
        .json({ message: "Username must be at least 4 characters long" });
    }

    // Check if the email is from "@cuchd.in" domain
    if (email && !email.endsWith("@cuchd.in")) {
      return res
        .status(400)
        .json({
          message: "Invalid email domain. Only @cuchd.in emails are allowed",
        });
    }

    user.username = username || user.username;
    user.email = email || user.email;

    await user.save();

    res.json({ message: "User updated successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// FOLLOW USER
export const followUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = req;

    // Check if the user being followed exists
    const followedUser = await User.findById(id);
    if (!followedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the current user is already following the user
    const isAlreadyFollowing = user.following.includes(followedUser._id);

    if (isAlreadyFollowing) {
      // If already following, unfollow the user

      // Remove the user from the "following" array of the current user
      user.following.pull(followedUser._id);
      await user.save();

      // Remove the current user from the "followers" array of the user being followed
      followedUser.followers.pull(user._id);
      await followedUser.save();

      return res.json({ message: "User unfollowed successfully" });
    }

    // If not already following, follow the user

    // Update the "following" array of the current user
    user.following.push(followedUser._id);
    await user.save();

    // Update the "followers" array of the user being followed
    followedUser.followers.push(user._id);
    await followedUser.save();

    res.json({ message: "User followed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// FETCH ALL THE BLOGS BY A PARTICULAR USER
export const getSingleUserBlogs = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the user by their ID
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Fetch all blogs of the user
    const blogs = await blogModel.find({ author: id });

    res.json({ user, blogs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// FETCH ALL THE TWEETS BY A PARTICULAR USER
export const getSingleUserTweets = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the user by their ID
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Fetch all blogs of the user
    const tweets = await Tweet.find({ author: id });

    res.json({ user, tweets });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// FETCH ALL THE LIKED BLOGS BY A PARTICULAR USER
export const getUserLikedBlogs = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the user by their ID
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Fetch all liked posts by the user
    const likedBlogs = await blogModel.find({ likes: id });

    res.json({ user, likedBlogs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// FETCH ALL THE LIKED BLOGS BY A PARTICULAR USER
export const getUserLikedTweets = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the user by their ID
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Fetch all liked posts by the user
    const likedTweets = await Tweet.find({ likes: id });

    res.json({ user, likedTweets });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// FETCH ALL THE COMMENTS BY A PARTICULAR USER
export const getUserComments = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the user by their ID
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Fetch all comments made by the user
    const comments = await Comment.find({ author: id });

    res.json({ user, comments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// UNKE BLOGS JINHE USER FOLLOW KRTA HAI
export const getFollowingBlogs = async (req, res) => {
  try {
    const { user } = req;

    // Retrieve the logged-in user's following list
    const loggedInUser = await User.findById(user._id).populate("following");

    if (!loggedInUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Extract the list of user IDs that the logged-in user follows
    const followedUserIds = loggedInUser.following.map((user) => user._id);

    // Fetch blog posts of the followed users
    const blogs = await blogModel
      .find({ author: { $in: followedUserIds } })
      .populate("author")
      .exec();

    res.json({ blogs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// FETCHES USER'S OWN BLOGS
export const getOwnBlogs = (req, res) => {
  const userId = req.user._id;

  User.findById(userId)
    .populate("blogs") // Assuming the reference to blogs is named 'blogs' in the user model
    .then((user) => {
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }

      res.status(200).json({ success: true, user });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ success: false, message: "Server error" });
    });
};

// GET LOGGEDIN USER
export const getLoggedInUser = (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
