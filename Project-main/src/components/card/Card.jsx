import image from "../Profile/profile.jpg";
import image2 from "../Profile/Image8.jpg";
import { formatTimeAgo } from "../../formatDate";
import { Link } from "react-router-dom";

const Card = ({ blog, author }) => {
  return (
    <div>
      <Link to={`/post/${blog._id}`} className="blog">
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
    </div>
  );
};

export default Card;
