import Topbar from "./components/topbar/Topbar";
import Homepage from "./pages/homepage/Homepage";
import Login from "./pages/Login/App";
import Register from "./pages/register/register";
import Profile from "./components/Profile/Profile";
import Blog from "./components/Blog/Blog";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Settings from "./pages/settings/Settings";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Protected from "./components/Protected";
import AuthorProfile from "./pages/authorProfile/AuthorProfile";

function App() {
  // const currentUser = false;
  return (
    <Router>
      <Topbar />
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={true}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
        progress={undefined}
        theme="light"
      />
      <Routes>
        <Route exact path="/" element={<Homepage />}></Route>
        <Route
          exact
          path="/Blog"
          element={<Protected Component={Blog} />}
        ></Route>
        <Route path="/Login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/post/:id" element={<Single />}></Route>
        <Route path="/write" element={<Protected Component={Write} />}></Route>
        <Route
          path="/settings"
          element={<Protected Component={Settings} />}
        ></Route>
        <Route
          path="/Profile"
          element={<Protected Component={Profile} />}
        ></Route>
        <Route path="/user/profile/:id" element={<AuthorProfile />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
