import React from "react";
import "./styles.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Cookie from "js-cookie";
import { toast } from "react-toastify";

function App() {
  const token = Cookie.get("token");
  const navigate = useNavigate();

  const schema = yup.object().shape({
    email: yup
      .string()
      .required("Please enter your email")
      .email("Please enter a valid email"),
    password: yup.string().required("Please enter your password").min(5),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    await axios
      .post(
        "http://localhost:4000/user/login",
        { email: data.email, password: data.password },
        { withCredentials: true }
      )
      .then(function (response) {
        toast.success(response.data.message);
        navigate("/");
      })
      .catch(function (error) {
        toast.error(error.response.data.message);
      });
  };

  if (token) navigate("/");

  return (
    <div className="loginForm">
      <h1 className="formHeading">Login Form</h1>
      <form className="form" action="" onSubmit={handleSubmit(onSubmit)}>
        <div className="emailDiv">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="text"
            placeholder="example@gmail.com"
            {...register("email")}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div className="passwordDiv">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            autoComplete="on"
            {...register("password")}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <button className="submitButton" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;
