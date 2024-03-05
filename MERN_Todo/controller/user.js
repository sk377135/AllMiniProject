import { json } from "express";
import { User } from "../model/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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

export const login = async (req, res) => {};

export const findSingle = async (req, res) => {};

export const allUser = async (req, res) => {};
