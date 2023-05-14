import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { formatTimeAgo } from "../../formatDate";
import "./authorProfile.css";
import image from "./profile.jpg";
import image2 from "./Image8.jpg";
import Card from "../../components/card/Card";

const AuthorProfile = () => {
  const { id } = useParams();
  const [author, setAuthor] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [follower, setFollower] = useState(null);
  const navigate = useNavigate();

  const fetchAuthor = async () => {
    await axios
      .get(`http://localhost:4000/user/${id}`)
      .then((data) => {
        setAuthor(data.data.user);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchAuthor();
    axios
      .get("http://localhost:4000/user", { withCredentials: "includes" })
      .then((data) => {
        setLoggedInUser(data.data.user);
      })
      .catch((error) => {
        return console.log(error);
      }); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  // useEffect(() => {
  //   if (loggedInUser?.following) {
  //     setFollower(loggedInUser?.following.includes(id));
  //     console.log("dusra useEffect");
  //   }
  // }, [id, loggedInUser?.following]);

  const followUser = async () => {
    await axios
      .post(
        `http://localhost:4000/user/follow/${id}`,
        {},
        { withCredentials: "includes" }
      )
      .then(() => setFollower(!follower))
      .catch((error) => console.log(error));
    fetchAuthor();
  };

  if (author?._id === loggedInUser?._id) navigate("/Profile");
  return (
    <div className="containerAuthorProfile">
      <div className="upperDiv">
        <img className="auhtorImg" src={image} alt="user" />
        <div className="details">
          <h3 className="username">{author?.username}</h3>
          <div className="detailsUpper">
            <div>
              <h5>Blogs</h5>
              <p>{author?.blogs.length}</p>
            </div>
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
                {follower ? "Follow" : "Unfollow"}
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
            return <Card blog={blog} author={author} key={blog._id} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default AuthorProfile;
