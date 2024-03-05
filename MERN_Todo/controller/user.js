import { json } from "express";
import { User } from "../model/user.js";
import bcrypt from "bcrypt";
import { config } from "dotenv";
import { setCookies } from "../utils/feature.js";
export const registerUser = async (req, res) => {
  // res.status(200).json({ sucess: true, message: "this is register" });
  ////? got the data from the front-end;
  const { name, email, password } = await req.body;

  ////? Trying to findout the if already exits;
  let user = await User.findOne({ email });
  if (user) {
    return res.status(404).json({
      sucess: false,
      message: "User already exits",
    });
  }

  ////? Protecting the password by encripting it;
  const hassedpassword = await bcrypt.hash(password, 10);

  ////? creating the user account ;
  user = await User.create({ name, email, password: hassedpassword });

  ////?  setCookies;
  setCookies(user, res, 201, "Register Sucessfully");
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");

  if (!user)
    return res.status(404).json({
      sucess: false,
      message: "Invalid user or password",
    });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    return res
      .status(404)
      .json({ sucess: true, message: "Invalid user or password" });

  setCookies(user, res, 200, `Welcome back ${user.name}`);
};

export const findProfile = (req, res) => {
  res.status(200).json({
    sucess: true,
    user: req.user,
  });
};
export const logout = async (req, res) => {
  res
    .status(200)
    .cookie("token", " ", { expires: new Date(Date.now()) })
    .json({
      sucess: true,
      message: "Logout Sucessfully",
    });
};

export const allUser = async (req, res) => {};
