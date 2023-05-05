import express from "express";

const app = express();

app.use("/", (req, res) => {
  res.send("hellow");
});

app.listen(4000, () => {
  console.log(`Server is running on http://localhost:4000`);
});
