import React, { useEffect, useState } from "react";
import image from "./profile.jpg";
import "./Profile.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Card from "../card/Card";
import { toast } from "react-toastify";

const Profile = () => {
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
      .then((response) => {
        toast.success(response.data.message);
        navigate("/login");
      })
      .catch((err) => console.log(err.response.data.message));
  };

  const handleEdit = () => {
    navigate("/settings");
  };

  useEffect(() => {
    axios
      .get(`http://localhost:4000/user/myblogs`, {
        withCredentials: "include",
      })
      .then((response) => {
        const data = response.data;
        setUser(data.user);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="containerAuthorProfile">
      <div className="upperDiv">
        <img className="auhtorImg" src={image} alt="user" />
        <div className="details">
          <h3 className="username">{user?.username}</h3>
          <div className="detailsUpper">
            <div>
              <h5>Blogs</h5>
              <p>{user?.blogs?.length}</p>
            </div>
            <div>
              <h5>Followers</h5>
              <p>{user?.followers?.length}</p>
            </div>
            <div>
              <h5>Following</h5>
              <p>{user?.following?.length}</p>
            </div>
            <div className="btnDiv">
              <button className="followBtn" onClick={handleEdit}>
                Edit Profile
              </button>
              <button className="followBtn" onClick={logout}>
                Logout
              </button>
            </div>
          </div>
          <div className="userBio">
            <p>
              Passionate about technology, nature enthusiast, and avid reader.
              Always seeking new adventures and embracing opportunities for
              personal growth. Let's connect and share our experiences!
            </p>
          </div>
        </div>
      </div>
      <div className="lowerDiv">
        <h3>Blog Posts</h3>
        <div className="blogs">
          {user?.blogs?.map((blog) => {
            return <Card blog={blog} author={blog.author} key={blog._id} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Profile;
