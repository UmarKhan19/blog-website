import { Link } from "react-router-dom";
import "./topbar.css";
import image from "../followerModal/profile.jpg";
import Cookie from "js-cookie";
import { useEffect, useState } from "react";

export default function Topbar() {
  const [token, setToken] = useState(null);
  const storedToken = Cookie.get("token");

  useEffect(() => {
    setToken(storedToken);
  }, [storedToken]);
  return (
    <div className="top">
      <div className="topLeft">
        <h1>
          {" "}
          <Link className="link" to="/">
            CuVogue
          </Link>
        </h1>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link className="link" to="/">
              HOME
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/Blog">
              BLOG
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/write">
              WRITE
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/explore">
              EXPLORE
            </Link>
          </li>
        </ul>
      </div>
      <div className="topRight">
        {token ? (
          <Link className="link name" to="/Profile">
            <img className="topImg" src={image} alt="" />
            Profile
          </Link>
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/login">
                LOGIN
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/register">
                REGISTER
              </Link>
            </li>
          </ul>
        )}
        <i className="topSearchIcon fas fa-search"></i>
      </div>
    </div>
  );
}
