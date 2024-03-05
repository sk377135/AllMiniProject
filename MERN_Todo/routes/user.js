import express from "express";
import {
  allUser,
  findSingle,
  login,
  registerUser,
} from "../controller/user.js";

const router = express.Router();

router.get("/api/v1/users/all", allUser);

router.post("/api/v1/user/login", login);

router.post("/api/v1/user/new", registerUser);

router.get("/api/v1/userid/:id", findSingle);

export default router;
