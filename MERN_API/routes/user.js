import express from "express";

import {
  allUser,
  deleteUser,
  findSingle,
  registerUser,
  updateData,
  updateUser,
} from "../controllers/user.js";

const router = express.Router();

router.get("/users/all", allUser);
router.get("/userid/:id", findSingle);
router.post("/users/new", registerUser);
router.delete("/userid/:id", deleteUser);
router.patch("/userid/:id", updateData);
router.put("/userid/:id", updateUser);
export default router;
