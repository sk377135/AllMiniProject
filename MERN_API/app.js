import express, { json } from "express";

import router from "./routes/user.js";
import { config } from "dotenv";

export const app = express();

config({
  path: "./database/config.env",
});

app.use(express.json());
app.use(router);

router.get("/", (req, res) => {
  res.send("nice working");
});
