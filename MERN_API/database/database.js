import mongoose from "mongoose";

export const connectDB = () => {
  mongoose
    .connect(process.env.mongoURI, {
      dbName: "MERN_API",
    })
    .then(() => {
      console.log("Database is connected");
    })
    .catch(e => {
      console.log(e);
    });
};
