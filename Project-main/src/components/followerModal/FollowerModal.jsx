import axios from "axios";
import { useEffect, useState } from "react";
import image from "./profile.jpg";
import { useNavigate } from "react-router-dom";
import "./followerModal.css";

const FollowerModal = (props) => {
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:4000/user", { withCredentials: "includes" })
      .then((data) => {
        setLoggedInUser(data.data.user);
      })
      .catch((error) => {
        return console.log(error);
      });
  }, []);

  return (
    <div className="followersModalContainer">
      <h1>User's {props.status}</h1>
      <div className="followers">
        {props?.followers?.map((follower) => (
          <div
            onClick={() => {
              console.log(loggedInUser._id === follower._id);
              if (loggedInUser._id === follower._id) navigate("/Profile");

              navigate(`/user/profile/${follower._id}`);
            }}
            className="follower"
            key={follower._id}
          >
            <img className="followerImg" src={image} alt="user" />
            <p className="followerUsername">{follower?.username}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FollowerModal;
