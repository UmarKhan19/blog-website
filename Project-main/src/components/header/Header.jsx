import "./header.css";
import video from "./pexels-mart-production-8865362-2560x1440-50fps.mp4";

export default function Header() {
  return (
    <div className="header">
      <div className="headerTitles">
        <span className="headerTitleSm">React & Node</span>
        <span className="headerTitleLg">BLOG</span>
      </div>
      <video className="headerImg" autoplay playsInline loop muted>
        <source src={video} type="video/mp4" />
      </video>
    </div>
  );
}
