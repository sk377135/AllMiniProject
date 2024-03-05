import { app } from "./app.js";
import { connectDB } from "./database/database.js";

connectDB();

app.listen(process.env.port, () => {
  console.log("server is connected");
});
