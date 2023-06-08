import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { formatTimeAgo } from "../../formatDate";
import "./singlePost.css";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";

// import Cookie from "js-cookie";

export default function SinglePost() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);

  // const token = Cookie.get("token");

  const fetchBlog = async () => {
    await axios
      .get(`http://localhost:4000/blog/${id}`)
      .then((data) => {
        setBlog(data.data.blog);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchBlog();
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

  const likeBlog = async () => {
    await axios
      .put(
        `http://localhost:4000/blog/${id}/like`,
        {},
        { withCredentials: "includes" }
      )
      .then((response) => {
        response.data.message === "Blog liked successfully"
          ? toast.success(response.data.message)
          : toast.error(response.data.message);
        fetchBlog();
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        <img
          className="singlePostImg"
          src="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
          alt=""
        />
        <h1 className="singlePostTitle">
          {blog && blog.title}
          <div className="singlePostEdit">
            <i className="singlePostIcon far fa-edit"></i>
            <i className="singlePostIcon far fa-trash-alt"></i>
          </div>
        </h1>
        <div className="singlePostInfo">
          <span>
            Author:
            <b className="singlePostAuthor">
              <Link className="link" to={`/user/profile/${blog?.author._id}`}>
                {blog?.author?.username}
              </Link>
            </b>
          </span>
          <span className="likeSpan">
            <p>Likes : {blog?.likes.length >= 0 ? blog.likes.length : "0"}</p>
            <button className="likeBtn" onClick={likeBlog}>
              {blog?.likes.includes(loggedInUser?._id) ? (
                <AiFillLike />
              ) : (
                <AiOutlineLike />
              )}
            </button>
          </span>
          <span>{formatTimeAgo(blog?.createdAt)}</span>
        </div>
        <p className="singlePostDesc">{blog?.content}</p>
      </div>
    </div>
  );
}
