import { Link } from "react-router-dom";
import "./sidebar.css";
import Image from "./me.jpg";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Sidebar() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    axios
      .get("http://localhost:4000/user", { withCredentials: "include" })
      .then((data) => setUser(data.data.user))
      .catch((error) => console.log(error));
  }, []);
  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <img src={Image} alt="user" />
        <p>
          Passionate about technology, nature enthusiast, and avid reader.
          Always seeking new adventures and embracing opportunities for personal
          growth. Let's connect and share our experiences!
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">INFO</span>
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <Link className="link" to="/posts?cat=Life">
              Username : {user?.username}
            </Link>
          </li>
          <li className="sidebarListItem">
            <Link className="link" to="/posts?cat=Music">
              Email : {user?.email}
            </Link>
          </li>
          <li className="sidebarListItem">
            <Link className="link" to="/posts?cat=Sport">
              Followers : {user?.followers.length}
            </Link>
          </li>
          <li className="sidebarListItem">
            <Link className="link" to="/posts?cat=Sport">
              Following : {user?.following.length}
            </Link>
          </li>
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
          <i className="sidebarIcon fab fa-facebook-square"></i>
          <i className="sidebarIcon fab fa-instagram-square"></i>
          <i className="sidebarIcon fab fa-pinterest-square"></i>
          <i className="sidebarIcon fab fa-twitter-square"></i>
        </div>
      </div>
    </div>
  );
}
