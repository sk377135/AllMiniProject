import mongoose from "mongoose";
const MERN_API_Schema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

export const User = mongoose.model("User", MERN_API_Schema);
