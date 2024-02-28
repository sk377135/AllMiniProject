// import http from "http";
// // import gfName from "./feature.js";
// // import gfName, { gfName2, gfName3 } from "./feature.js";
// // import { Rendom_num } from "./feature.js";
// // import * as freatures_module from "./feature.js";
// // console.log(freatures_module.gfName2);
// // console.log(Rendom_num());
// // import fs from "fs";

// const server = http.createServer((req, res) => {
//   if (req.url === "/") {
//     const read_file = fs.readFileSync("./index.html");
//     res.end(read_file);
//     // res.end("<h1>This home</h1>");
//   } else if (req.url === "/Contect") {
//     res.end("<h1>This is Contect page</h1>");
//   } else if (req.url === "/about") {
//     res.end("<h1>This is about page</h1>");
//   } else {
//     res.end("<h1>Page not found</h1>");
//   }
// });
// server.listen(5000, () => {
//   console.log("Server is running");
// });

////////////? Above is code are for the node ///////////

///? Now Express////

// import express from "express";
// import path from "path";

// const app = express();
// const pathlocation = path.resolve();
// app.get("/", (req, res) => {
//   res.end("<h1>this is home page <h1>");
// });
// app.get("/about", (req, res) => {
//   res.status(404).send("Page not found");
// });
// app.get("/data", (req, res) => {
//   res.json({ name: "suraj", Mob: "2500" });
// });
// app.get("/file", (req, res) => {
//   res.sendFile(path.join(pathlocation, "index.html"));
// });
// app.listen(5000, () => {
//   console.log("Server is running ");
// });

////! Above code it for js But----- Below using ejs insded of the html////

// import express from "express";
// import path from "path";

// const app = express();
// app.get("/", (req, res) => {
//   res.render("index.ejs", { name: "Rohan" });
// });
// app.listen(5000, () => {
//   console.log("Server is running ");
// });

//! Above code is basic of ejs////

// import express from "express";
// import path from "path";

// const app = express();
// app.use(express.static(path.join(path.resolve(), "public")));
// app.use(express.urlencoded({ extended: true }));

// app.set("view engine", "ejs");

// app.get("/", (req, res) => {
//   res.send("index");
// });

// app.listen(5000, () => {
//   console.log("Server is running ");
// });
// ! accessing the static file , image etc from ejs////

import express from "express";
import path from "path";
import mongoose from "mongoose";
import { name } from "ejs";
import { log } from "console";
//! mongodb://localhost:27017
//!  mongodb://127.0.0.1:27017
//! R_TodoList
//! messages
mongoose
  .connect("mongodb://127.0.0.1:27017", {
    dbName: "R_TodoList",
  })
  .then(() => {
    console.log("Data base connected");
  })
  .catch(e => {
    console.log(e);
  });

const messageSchema = new mongoose.Schema({ name: String, email: String });

const message = mongoose.model("message", messageSchema);

const app = express();
const users = [];
app.use(express.static(path.join(path.resolve(), "public")));
/// only using when use static file from public folder
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  //   res.send("index");

  ///this is for the stactic html file
  res.render("index", { name: "hello" });
});
app.post("/contect", (req, res) => {
  const { name, email } = req.body;
  users.push({ name, email });
  // console.log(users);

  message.create({ name, email });
  res.redirect("/success");
});
app.get("/success", (req, res) => {
  res.render("success", { name: "raju" });
});
app.get("/users", (req, res) => {
  res.json({ users });
});

app.listen(5000, () => {
  console.log("Server is running ");
});
