import User from "../models/userSchema.js";
import Comment from "../models/commentSchema.js";
import Tweet from "../models/tweetSchema.js";

// POST TWEET
export const postTweet = async (req, res) => {
  try {
    const { content } = req.body;
    const { user } = req;

    if (!content) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide tweet content" });
    }

    const tweet = new Tweet({
      author: user,
      content,
    });

    await tweet.save();

    // Update the user's tweets array
    await User.findByIdAndUpdate(user._id, { $push: { tweets: tweet._id } });

    res
      .status(200)
      .json({ success: true, message: "Tweet posted successfully", tweet });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// LIKE TWEET
export const likeTweet = async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = req;

    const tweet = await Tweet.findById(id);
    if (!tweet) {
      return res
        .status(404)
        .json({ success: false, message: "Tweet not found" });
    }

    const userLiked = tweet.likes.includes(user._id);

    if (userLiked) {
      // Unlike the tweet
      tweet.likes.pull(user._id);
      user.tweetLikes.pull(tweet._id);
      await tweet.save();
      await user.save();
      res.status(200).json({
        success: true,
        message: "Tweet unliked successfully",
        tweet,
      });
    } else {
      // Like the tweet
      tweet.likes.push(user._id);
      user.tweetLikes.push(tweet._id);
      await tweet.save();
      await user.save();
      res.status(200).json({
        success: true,
        message: "Tweet liked successfully",
        tweet,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// FETCH ALL THE TWEETS
export const getAllTweets = async (req, res) => {
  try {
    const tweets = await Tweet.find().populate("author", "username");

    res.status(200).json({
      success: true,
      message: "Tweets fetched successfully",
      tweets,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// FETCH SINGLE TWEET
export const getSingleTweet = async (req, res) => {
  try {
    const { id } = req.params;

    const tweet = await Tweet.findById(id).populate("author", "username");

    if (!tweet) {
      return res
        .status(404)
        .json({ success: false, message: "Tweet not found" });
    }

    res.status(200).json({
      success: true,
      message: "Tweet fetched successfully",
      tweet,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// COMMENT ON TWEET
export const addCommentToTweet = async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = req;
    const { content } = req.body;

    const tweet = await Tweet.findById(id);

    if (!tweet) {
      return res
        .status(404)
        .json({ success: false, message: "Tweet not found" });
    }

    const newComment = {
      author: user._id,
      content,
      parentType: "tweet",
      parentId: tweet._id,
    };

    const comment = await Comment.create(newComment);

    tweet.comments.push(comment._id);
    await tweet.save();

    user.comments.push(comment._id);
    await user.save();

    res.status(201).json({
      success: true,
      message: "Comment added successfully",
      comment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// DELETE THE TWEET
export const deleteTweet = async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = req;

    const tweet = await Tweet.findById(id);

    if (!tweet) {
      return res
        .status(404)
        .json({ success: false, message: "Tweet not found" });
    }

    // Check if the authenticated user is the author of the tweet
    if (tweet.author.toString() !== user._id.toString()) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }
    await tweet.deleteOne();

    res
      .status(200)
      .json({ success: true, message: "Tweet deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
