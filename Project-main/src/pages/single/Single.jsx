import Comments from "../../components/comments/Comments";
import Sidebar from "../../components/sidebar/Sidebar";
import SinglePost from "../../components/singlePost/SinglePost";
import "./single.css";

export default function Single() {
  return (
    <div className="single">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "6rem",
          width: "100%",
        }}
      >
        <SinglePost />
        <Comments />
      </div>
      <Sidebar />
    </div>
  );
}
