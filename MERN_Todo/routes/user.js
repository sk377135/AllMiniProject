import express from "express";
import {
  allUser,
  findProfile,
  login,
  logout,
  registerUser,
} from "../controller/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.get("/users/all", allUser);

router.post("/user/login", login);

router.post("/user/new", registerUser);

router.get("/user/me", isAuthenticated, findProfile);

router.get("/user/logout", logout);

export default router;
