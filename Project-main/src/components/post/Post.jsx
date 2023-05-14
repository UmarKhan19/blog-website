// import { useEffect, useState } from "react";
import axios from "axios";
import "./post.css";
import { useEffect, useState } from "react";
import Card from "../card/Card";

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
        <div className="blogs">
          {" "}
          {blogs.map((blog) => {
            return <Card blog={blog} author={blog.author} key={blog._id} />;
          })}
        </div>
      )}
    </>
  );
}
