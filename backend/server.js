import express from "express";
import mongoose from "mongoose";
import blogRoute from "./routes/blogRoute.js";
import userRoute from "./routes/userRoute.js";
import tweetRoute from "./routes/tweetRoute.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
// app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

mongoose
  .connect("mongodb://127.0.0.1:27017/cuvogue", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB.");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.use(blogRoute);
app.use(userRoute);
app.use(tweetRoute);

app.listen(4000, () => {
  console.log(`Server is running on http://localhost:4000`);
});
