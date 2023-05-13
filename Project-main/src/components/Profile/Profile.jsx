import React, { useEffect, useState } from "react";
import image from "./profile.jpg";
import image2 from "./Image8.jpg";
import "./Profile.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { formatTimeAgo } from "../../formatDate";
const Profile = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const logout = async () => {
    await axios
      .post(
        "http://localhost:4000/user/logout",
        {},
        {
          withCredentials: "includes",
        }
      )
      .then((data) => navigate("/login"))
      .catch((err) => console.log(err.response.data.message));
  };

  useEffect(() => {
    axios
      .get(`http://localhost:4000/user/myblogs`, {
        withCredentials: "include",
      })
      .then((response) => {
        const data = response.data;
        setUser(data.user);
        setBlogs(data.user.blogs);
        // setBlogs(data.blogs);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="container">
      <div className="Profile-img">
        <img src={image} alt="user" className="profile-pic img" />
      </div>
      <div className="Profile-heading">
        <div className="heading">
          <h3>{user.username}</h3>
          <button className="btn">
            <Link className="link" to="/settings">
              Edit Profile
            </Link>
          </button>
          <button className="btn" onClick={logout}>
            logout
          </button>
        </div>
        <div className="social-data">
          <div>
            <h5>Blogs</h5>
            <span>{`${blogs ? blogs.length : "0"}`}</span>
          </div>
          <div>
            <h5>Followers</h5>
            <span>{!user.followers ? "0" : user.followers.length}</span>
          </div>
          <div>
            <h5>Following</h5>
            <span>{!user.following ? "0" : user.following.length}</span>
          </div>
        </div>
        <div className="description">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore itaque
          hic odio et tenetur sit vel molestiae incidunt temporibus saepe!
        </div>
      </div>
      {/* carddssssssssssssssssssssssss */}

      <div className="Profile-blogs">
        {blogs.length === 0 ? (
          <p>No blogs</p>
        ) : (
          blogs.map((elem) => {
            return (
              <Link key={elem._id} className="contain" to={`/post/${elem._id}`}>
                {" "}
                {/* <div className="contain" key={elem._id}> */}
                <div className="Picture">
                  <img src={image2} alt="Niche" className="img" />
                </div>
                <div className="description-card">
                  <div className="category tag-blue">
                    <p>{"Technology"}</p>
                  </div>
                  <div className="text">
                    <h4 className="heading">{elem.title}</h4>
                    <p className="para">{elem.content}</p>
                  </div>
                  <div className="author-description">
                    <div className="author">
                      <img className="user-image" src={image} alt="user" />
                      <div className="user-info">
                        <h3>{!user.username ? "User" : user.username}</h3>
                        <p>{formatTimeAgo(elem.createdAt)}</p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* </div> */}
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Profile;
