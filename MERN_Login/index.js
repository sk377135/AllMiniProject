import express from "express";
import mongoose from "mongoose";
import path from "path";

////! 127.0.0.1 === localhost
// Use either of this to connect with Database

const app = express();
mongoose
  .connect("mongodb://127.0.0.1:27017", {
    dbName: "MERN_LOGIN",
  })
  .then(() => {
    console.log("DataBase is connected");
  })
  .catch(e => {
    console.log(e);
  });

const MERN_LOGIN_Schema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const message = mongoose.model("message", MERN_LOGIN_Schema);

app.set("view engine", "ejs");

app.use(express.static(path.join(path.resolve(), "public")));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index");
});
app.post("/add", (req, res) => {
  const { name, email, password } = req.body;
  message.create({ name, email, password });
  res.redirect("/sucess");
});
app.get("/sucess", (req, res) => {
  res.render("sucess");
});
app.listen("5000", () => {
  console.log("The server is running");
});
