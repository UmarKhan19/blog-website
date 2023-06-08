import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./authorProfile.css";
import image from "./profile.jpg";
import Card from "../../components/card/Card";
import { toast } from "react-toastify";
import FollowerModal from "../../components/followerModal/FollowerModal";

const AuthorProfile = () => {
  const { id } = useParams();
  const [author, setAuthor] = useState(null);
  const [followerModal, setFollowerModal] = useState(false);
  const [followingModal, setFollowingModal] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [follower, setFollower] = useState(null);
  const [followers, setFollowers] = useState(null);
  const [following, setFollowing] = useState(null);

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
    const data = async () => {
      await fetchAuthor();
      await axios
        .get("http://localhost:4000/user", { withCredentials: "includes" })
        .then((data) => {
          setLoggedInUser(data.data.user);
        })
        .catch((error) => {
          return console.log(error);
        });
    };
    data();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [follower]);
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
      .then(() => {
        setFollower(!follower);
      })
      .catch((error) => toast.error(error?.response?.data?.message));
    fetchAuthor();
  };

  const handleFollowing = async () => {
    await axios
      .get(`http://localhost:4000/user/${author?._id}/following`, {
        withCredentials: "includes",
      })
      .then((response) => setFollowing(response.data?.following))
      .then((error) => toast.success(error?.response?.data?.message));
  };
  const handleFollowers = async () => {
    await axios
      .get(`http://localhost:4000/user/${author?._id}/followers`, {
        withCredentials: "includes",
      })
      .then((response) => setFollowers(response?.data?.followers))
      .then((error) => toast.success(error?.response?.data?.message));
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
            <div
              onClick={() => {
                handleFollowers();
                setFollowerModal(!followerModal);
                setFollowingModal(false);
              }}
              className="followerDiv"
            >
              <h5>Followers</h5>
              <p>{author?.followers.length}</p>
            </div>
            <div
              className="followerDiv"
              onClick={() => {
                handleFollowing();
                setFollowerModal(false);
                setFollowingModal(!followingModal);
              }}
            >
              <h5>Following</h5>
              <p>{author?.following.length}</p>
            </div>
            <div>
              <button className="followBtn" onClick={followUser}>
                {!follower ? "Unfollow" : "Follow"}
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
      {followerModal ? (
        <FollowerModal followers={followers} status="followers" />
      ) : null}
      {followingModal ? (
        <FollowerModal followers={following} status={"following"} />
      ) : null}
    </div>
  );
};

export default AuthorProfile;
