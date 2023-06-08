import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import "./comments.css";
import image from "../Profile/profile.jpg";

const Comments = () => {
  const { id } = useParams();
  const [comments, setComments] = useState(null);
  const [commentValue, setCommentValue] = useState("");
  const [loggedInUser, setLoggedInUser] = useState(null);

  const schema = yup.object().shape({
    comment: yup.string().required("Comment is required"),
  });

  const fetchComments = async () => {
    await axios
      .get(`http://localhost:4000/blog/${id}/comments`, {
        withCredentials: "includes",
      })
      .then((response) => setComments(response.data.comments))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchComments();
    axios
      .get("http://localhost:4000/user", { withCredentials: "includes" })
      .then((data) => {
        setLoggedInUser(data.data.user);
      })
      .catch((error) => {
        return console.log(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    console.log("submit");
    await axios
      .post(
        `http://localhost:4000/blog/${id}/addcomment`,
        { content: data.comment },
        { withCredentials: "includes" }
      )
      .then((response) => toast.success(response.data.message))
      .catch((error) => toast.error(error.response.data.message));
    setCommentValue("");
    fetchComments();
  };

  const handleCancel = () => {
    setCommentValue("");
  };

  const deleteComment = async (commentId) => {
    await axios
      .delete(`http://localhost:4000/comment/delete/${commentId}`, {
        withCredentials: "includes",
      })
      .then((response) => {
        toast.success(response.data.message);
        fetchComments();
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="CommentsDiv">
      <h2 className="CommentsHeading">Comments</h2>
      <form className="commentForm" onSubmit={handleSubmit(onSubmit)}>
        <textarea
          className="commentInput"
          value={commentValue}
          placeholder="Write a comment..."
          {...register("comment", {
            onChange: (e) => {
              setCommentValue(e.target.value);
            },
          })}
        />
        <div className="btnDiv">
          <button className="commentSubmit" type="submit">
            Submit
          </button>
          <span onClick={handleCancel} className="commentCancel">
            Cancel
          </span>
        </div>
      </form>
      <div className="commentsContainer">
        {comments?.map((comment) => (
          <div className="singleComment" key={comment._id}>
            <div className="commentDetails">
              <div className="commentUser">
                <img src={image} className="commentUserImg" alt="user" />
                <h4 className="commentUser">{comment.author.username}</h4>
              </div>
              <p className="commentContent">{comment.content}</p>
            </div>

            {loggedInUser?._id === comment.author._id ? (
              <button
                className="commentDelete"
                onClick={() => deleteComment(comment._id)}
              >
                Delete
              </button>
            ) : (
              ""
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
