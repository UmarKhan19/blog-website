import mongoose from "mongoose";

const { Schema, model } = mongoose;

const commentSchema = new Schema(
  {
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    parentType: { type: String, required: true },
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "parentType",
    },
  },
  { timestamps: true }
);

const Comment = model("Comment", commentSchema);

export default Comment;
