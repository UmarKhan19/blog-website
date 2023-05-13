import React, { useEffect, useState } from "react";
import "./Blog.css";
import image from "./Image8.jpg";
import picture from "./profile-pic.jpg";
import { Link } from "react-router-dom";
import axios from "axios";

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
      <div className="cards">
        {blogs &&
          blogs.map((elem) => {
            return (
              <Link to={`/post/${elem._id}`} className="card" key={elem._id}>
                <div className="blog-picture">
                  <img src={image} alt="Niche" />
                </div>
                <div className="description">
                  <div className="category tag-blue">Technology</div>
                  <div className="heading">
                    <h4>{elem.title}</h4>
                  </div>
                  <div className="para">{elem.content}</div>
                  <div className="author-description">
                    <div className="author">
                      <img className="user-image" src={picture} alt="User" />
                      <div className="user-info">
                        <h3>{elem.username}</h3>
                      </div>
                    </div>

                    <div className="read-more">
                      <Link to="/post/abc" className="read">
                        Read More
                      </Link>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default Blog;
