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
          <li className="sidebarListItem">Username : {user?.username}</li>
          <li className="sidebarListItem">Email : {user?.email}</li>
          <li className="sidebarListItem">
            Followers : {user?.followers.length}
          </li>
          <li className="sidebarListItem">
            Following : {user?.following.length}
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
