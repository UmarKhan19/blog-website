import User from "../models/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// REGISTERING A USER
export const registerUser = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    // Check if the username already exists
    const existingUser =
      (await User.findOne({ username })) || (await User.findOne({ email }));
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      comments: [],
      blogLikes: [],
      tweetLikes: [],
      blogsPosted: [],
      tweetsPosted: [],
      followers: [],
      following: [],
      profilePicture: "",
    });

    // Save the user to the database
    await newUser.save();

    // Generate a token
    const token = jwt.sign({ userId: newUser._id }, "jwtsecretkey");

    // Set the token as a cookie in the response
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000 * 15, // 1 day
    });

    // Send the user data in the response
    res.status(201).json({
      success: true,
      newUser,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
};

// FETCH SINGLE USER
export const getSingleUser = async function (req, res) {
  const { id } = req.params;

  const user = await User.findById(id);

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
  try {
    // Check if user is already logged in
    if (req.cookies.token) {
      return res.status(400).json({ error: "You are already logged in." });
    }

    // Check if user exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password." });
    }

    // Check if password is correct
    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid email or password." });
    }

    // Create a token
    const token = jwt.sign({ id: user._id }, "jwtsecretkey");

    // Set the token in a cookie
    await res.cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    // Send the user object without the password and tokens
    const { password, tokens, ...userWithoutSensitiveData } = user.toObject();
    res.status(200).json(userWithoutSensitiveData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// LOGOUT USER
export const logoutUser = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "Logged out successfully" });
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

    user.username = username || user.username;
    user.email = email || user.email;

    await user.save();

    res.json({ message: "User updated successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
