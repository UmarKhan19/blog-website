import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { formatTimeAgo } from "../../formatDate";
import "./authorProfile.css";
import image from "./profile.jpg";
import image2 from "./Image8.jpg";

const AuthorProfile = () => {
  const { id } = useParams();
  const [author, setAuthor] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [follower, setFollower] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/user/${id}`)
      .then((data) => {
        setAuthor(data.data.user);
        console.log("useEffect");
      })
      .catch((error) => console.log(error));
    axios
      .get("http://localhost:4000/user", { withCredentials: "includes" })
      .then((data) => setLoggedInUser(data.data.user))
      .catch((error) => console.log(error));
  }, [id]);

  useEffect(() => {
    if (loggedInUser?.following) {
      setFollower(loggedInUser?.following.includes(id));
      console.log("dusra useEffect");
    }
  }, [id, loggedInUser?.following]);

  const followUser = async () => {
    await axios
      .post(
        `http://localhost:4000/user/follow/${id}`,
        {},
        { withCredentials: "includes" }
      )
      .then(() => setFollower(!follower))
      .catch((error) => console.log(error));
  };

  return (
    <div className="containerAuthorProfile">
      <div className="upperDiv">
        <img className="auhtorImg" src={image} alt="user" />
        <div className="details">
          <h3 className="username">{author?.username}</h3>
          <div className="detailsUpper">
            <div>
              <h5>Followers</h5>
              <p>{author?.followers.length}</p>
            </div>
            <div>
              <h5>Following</h5>
              <p>{author?.following.length}</p>
            </div>
            <div>
              <button className="followBtn" onClick={followUser}>
                {follower ? "Unfollow" : "Follow"}
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
          {author?.blogs.map((blog) => {
            return (
              <Link to={`/post/${blog._id}`} className="blog" key={blog._id}>
                <img className="blogImg" src={image2} alt="blog" />
                <div className="blogDetails">
                  <h4 className="blogTitle">{blog.title}</h4>
                  <p className="blogContent">{blog.content}</p>
                  <div className="blogLowerDetails">
                    <div className="blogUserDetails">
                      <img className="blogAuthorImg" src={image} alt="user" />
                      <p className="blogUsername">{author.username}</p>
                    </div>
                    <p className="blogDate">{formatTimeAgo(blog.createdAt)}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AuthorProfile;
