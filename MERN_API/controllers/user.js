import { json } from "express";
import { User } from "../model/user.js";

export const registerUser = async (req, res) => {
  const { name, email, password } = await req.body;
  try {
    await User.create({
      name,
      email,
      password,
    });

    res.status(201).json({
      sucess: true,
      message: "register sucessfully",
    });
  } catch (e) {
    console.log(`Register error database: ${e}`);
  }
};

export const findSingle = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  res.json({
    sucess: true,
    user,
  });
};

export const updateData = async (req, res) => {
  const { id } = await req.params;
  const updatedData = await req.body;

  try {
    await User.updateOne({ _id: id }, { $set: updatedData });
    const updateded_user = await User.findById(id);
    res.json({ message: "sucess", updateded_user });
  } catch (e) {
    console.log(`Didn't found the user or data :${e}`);
  }
};

export const allUser = async (req, res) => {
  try {
    const users = await User.find({});

    res.json({
      message: "sucess",
      users,
    });
  } catch (e) {
    console.log(`allUser database error: ${e}`);
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const data_to_replace = req.body; // No need to await here

  try {
    await User.replaceOne({ _id: id }, data_to_replace);
    const replaced_user = await User.findById(id);
    res.json({
      message: "success", // Corrected spelling
      replaced_user,
    });
  } catch (error) {
    console.log(`Error replacing user: ${error}`);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  try {
    await user.deleteOne();
    res.json({
      sucess: true,
      message: "Deleted sucessfully",
    });
  } catch (e) {
    console.log(`User not found :${e}`);
  }
};
