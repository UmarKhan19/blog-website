import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import axios from "axios";

import "./write.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Write() {
  const schema = yup.object().shape({
    content: yup.string().required("Please enter some content"),
    title: yup.string().required("Please enter the title").min(5),
    file: yup.mixed().required(),
  });

  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState();

  const handleChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    // await axios
    //   .post("http://localhost:4000/postblog", data, {
    //     withCredentials: "includes",
    //   })
    //   .then(function (response) {
    //     console.log("Blog posted successfully");
    //     return response.data.blogPost._id;
    //   })
    //   .then((data) => navigate(`/post/${data}`))
    //   .catch(function (error) {
    //     console.log(error.response.data);
    //   });
    console.log(data.file[0]);
    axios
      .post(
        "http://localhost:4000/file",
        { file: data.file[0] },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then(() => console.log("file uploaded"))
      .catch((error) => console.log(error));
  };
  return (
    <div className="write">
      <img
        className="writeImg"
        src="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
        alt=""
      />
      <form className="writeForm" onSubmit={handleSubmit(onSubmit)}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input
            onChange={handleChange}
            id="fileInput"
            type="file"
            accept=".jpg, .png, .jpeg"
            style={{ display: "none" }}
            {...register("file")}
          />
          <input
            id="title"
            className="writeInput"
            placeholder="Title"
            type="text"
            autoFocus={true}
            {...register("title")}
          />
          {errors?.title && <p>{errors?.title}</p>}
        </div>
        <div className="writeFormGroup">
          <textarea
            id="content"
            className="writeInput writeText"
            placeholder="Tell your story..."
            type="text"
            autoFocus={true}
            {...register("content")}
          />
          {errors?.content && <p>{errors?.content}</p>}
        </div>

        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
}
