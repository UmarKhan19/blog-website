import { Link } from "react-router-dom";
import "./topbar.css";
import Cookie from "js-cookie";
import { useEffect, useState } from "react";

export default function Topbar() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = Cookie.get("token");
    setToken(storedToken);
  }, [token]);
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
            {" "}
            <Link className="link" to="/Blog">
              BLOG
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/write">
              WRITE
            </Link>
          </li>
        </ul>
      </div>
      <div className="topRight">
        {token ? (
          <Link className="link name" to="/Profile">
            <img
              className="topImg"
              src="https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
            />
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
