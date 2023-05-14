import "./settings.css";
import Sidebar from "../../components/sidebar/Sidebar";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function Settings() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const schema = yup.object().shape({
    email: yup.string().email("Please enter a valid email"),
    username: yup.string(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema), mode: "onChange" });

  useEffect(() => {
    axios
      .get("http://localhost:4000/user", { withCredentials: "includes" })
      .then((data) => {
        setUsername(data.data.user.username);
        setEmail(data.data.user.email);
      })
      .catch((error) => {
        return console.log(error);
      }); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onSubmit = async (data) => {
    await axios
      .put(
        `http://localhost:4000/user/update`,
        { username: data.username, email: data.email },
        { withCredentials: "includes" }
      )
      .then((response) => {
        toast.success(response.data.message);
        setUsername("");
        setEmail("");
        navigate("/Profile");
      })
      .catch((error) => toast.error(error.response.data.message));
  };

  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsTitleUpdate">Update Your Account</span>
          {/* <span className="settingsTitleDelete">Delete Account</span> */}
        </div>
        <form className="settingsForm" onSubmit={handleSubmit(onSubmit)}>
          <label>Profile Picture</label>
          <div className="settingsPP">
            <img
              src="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
            />
          </div>
          <label>Username</label>
          <input
            type="text"
            placeholder="username"
            name="name"
            value={username}
            {...register("username", {
              onChange: (e) => {
                setUsername(e.target.value);
              },
            })}
          />
          {<p className="error">{errors?.username?.message}</p>}
          <label>Email</label>
          <input
            type="text"
            placeholder="example@gmail.com"
            name="email"
            value={email}
            {...register("email", {
              onChange: (e) => {
                setEmail(e.target.value);
              },
            })}
          />
          {<p className="error">{errors?.email?.message}</p>}

          <button className="settingsSubmitButton" type="submit">
            Update
          </button>
        </form>
      </div>
      <Sidebar />
    </div>
  );
}
