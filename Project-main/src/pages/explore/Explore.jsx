import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import Card from "../../components/card/Card";
import profilePic from "../../components/Profile/profile.jpg";
import "./explore.css";

const Explore = () => {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [searchError, setSearchError] = useState(null);
  const [toSearch, setToSearch] = useState("users");

  const searchUsers = async () => {
    await axios
      .get(`http://localhost:4000/${toSearch}/search/${query}`, {
        withCredentials: "includes",
      })
      .then((response) => {
        response?.data?.[toSearch]?.length === 0
          ? setSearchError("Nothing found")
          : setUsers(response.data[toSearch]);
      })
      .catch((error) => console.log(error.response.data));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchError("");
    searchUsers();
  };
  console.log(toSearch);
  return (
    <div className="exploreContainer">
      <form className="searchForm" onSubmit={handleSearch}>
        <input
          className="searchbar"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="commentSubmit" type="submit">
          Search
        </button>
      </form>

      <div className="btnDiv">
        <button
          className="commentSubmit"
          onClick={() => {
            setUsers([]);
            setToSearch("users");
          }}
          style={{
            backgroundColor: `${
              toSearch === "users" ? "#646ded" : "transparent"
            }`,
          }}
        >
          Users
        </button>
        <button
          className="commentSubmit"
          onClick={() => {
            setUsers([]);
            setToSearch("blogs");
          }}
          style={{
            backgroundColor: `${
              toSearch === "blogs" ? "#646ded" : "transparent"
            }`,
          }}
        >
          Blogs
        </button>
      </div>

      {searchError ? (
        <p>{searchError}</p>
      ) : toSearch === "users" ? (
        <ul className="list">
          {users.length === 0 ? (
            <p>Please search users</p>
          ) : (
            users.map((user) => (
              <li className="listItem" key={user._id}>
                <img src={profilePic} alt="user" />
                <Link to={`/user/profile/${user._id}`}>
                  <div className="exploreUserDetail">
                    <div>
                      {user.username}
                      <p>{user.email}</p>
                    </div>
                    <div>{`Blogs : ${user.blogs.length}`}</div>
                  </div>
                </Link>
              </li>
            ))
          )}
        </ul>
      ) : (
        <ul
          className="list"
          style={{
            // width: "33%",
            display: "flex",
            flexDirection: "column",
            gap: "3rem",
          }}
        >
          {users.length === 0 ? (
            <p>Please search blogs</p>
          ) : (
            users?.map((blog) => (
              <Card blog={blog} author={blog.author} key={blog._id} />
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default Explore;
