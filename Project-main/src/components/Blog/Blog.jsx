import React, { useEffect, useState } from "react";
import "./Blog.css";
import axios from "axios";
import Card from "../card/Card";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/blogs/following`, {
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
    <div className="blogsDiv">
      <h1>Following's Blogs</h1>
      <div className="blogs">
        {blogs &&
          blogs.map((elem) => {
            return <Card blog={elem} author={elem.author} key={elem._id} />;
          })}
      </div>
    </div>
  );
};

export default Blog;
