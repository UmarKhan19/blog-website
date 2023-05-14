import "./register.css";
import React from "react";
import axios from "axios";
// import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const { token } = Cookies?.get();

  if (token) navigate(-1);

  const schema = yup.object().shape({
    email: yup
      .string()
      .required("Please enter your email")
      .email("Please enter a valid email"),
    username: yup.string().required("Please enter your username"),
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
        "http://localhost:4000/user/register",
        { email: data.email, username: data.username, password: data.password },
        { withCredentials: true }
      )
      .then(function (response) {
        navigate("/Profile");
        toast.success(response.data.message);
      })
      .catch(function (error) {
        toast.error(error.response.data.message, { autoClose: 2000 });
      });
  };
  return (
    <div className="loginForm">
      <h1 className="formHeading">Register Form</h1>
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
        <div className="emailDiv">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            placeholder="Umar"
            {...register("username")}
          />
          {errors.username && <p>{errors.username.message}</p>}
        </div>
        <div className="passwordDiv">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="text"
            placeholder="Enter your password"
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
};

export default Register;
