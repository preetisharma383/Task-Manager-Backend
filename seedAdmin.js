import mongoose from "mongoose";

import User from "./src/models/auth/UserModel.js";
import dotenv from "dotenv"
dotenv.config();
mongoose.connect(process.env.MONGO_URI);

const seedAdmin = async () => {
  const adminExists = await User.findOne({ email: "admin@gmail.com" });

  if (adminExists) {
    console.log("Admin already exists");
    process.exit();
  }

 

  await User.create({
    name: "Admin",
    email: "admin@gmail.com",
    password: "1234",
    role: "admin",
  });


  console.log("Admin created");
  process.exit();
};

seedAdmin();
