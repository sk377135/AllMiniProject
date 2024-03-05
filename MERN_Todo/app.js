import express, { json } from "express";
import router from "./routes/user.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";

export const app = express();

config({
  path: "./database/config.env",
});

app.use(express.json());
app.use(cookieParser());
app.use("/api/v1", router);

router.get("/", (req, res) => {
  res.send("nice working");
});
