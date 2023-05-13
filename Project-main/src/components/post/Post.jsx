// import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./post.css";
import { useEffect, useState } from "react";
import { formatTimeAgo } from "../../formatDate";

export default function Post({ img }) {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/blogs/all`, {
        withCredentials: "include",
      })
      .then((response) => {
        const data = response.data;
        setBlogs(data.blogs);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  }, []);

  return (
    <>
      {" "}
      {!blogs ? (
        <div>
          {" "}
          <p>No blog!!</p>{" "}
        </div>
      ) : (
        <div>
          {" "}
          {blogs.map((blog) => {
            return (
              <Link to={`/post/${blog._id}`} className="post" key={blog._id}>
                <img className="postImg" src={img} alt="" />
                <div className="postInfo">
                  <div className="postCats">
                    <span className="postCat">Music</span>
                    <span className="postCat">Life</span>
                  </div>
                  <span className="postTitle">{blog.title}</span>
                  <hr />
                  <span className="postDate">
                    {formatTimeAgo(blog.createdAt)}
                  </span>
                </div>
                <p className="postDesc">{blog.content}</p>
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}
