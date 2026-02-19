import asyncHandler from "express-async-handler";
import User from "../../models/auth/UserModel.js";
import Task from "../../models/tasks/TaskModel.js";
import bcrypt from "bcryptjs";

// ---------------- CREATE USER ----------------
export const createUser = asyncHandler(async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    res.status(400);
    throw new Error("Name and email required");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password: await bcrypt.hash("123456", 10), // default password
  });

  res.status(201).json(user);
});

// ---------------- GET ALL USERS WITH TASKS ----------------
export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({ role: "user" })
    .select("-password")
    .populate("tasks");

  res.status(200).json(users);
});

// ---------------- DELETE SINGLE USER ----------------
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  await Task.deleteMany({ user: user._id }); // delete related tasks
  await user.deleteOne();

  res.status(200).json({ message: "User deleted" });
});

// ---------------- DELETE ALL USERS ----------------
export const deleteAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({ role: "user" });

  const userIds = users.map((u) => u._id);

  await Task.deleteMany({ user: { $in: userIds } });
  await User.deleteMany({ role: "user" });

  res.status(200).json({ message: "All users deleted" });
});

// ---------------- ASSIGN TASK ----------------
export const assignTask = asyncHandler(async (req, res) => {
  const { userId, title } = req.body;

  if (!userId || !title) {
    res.status(400);
    throw new Error("UserId and title required");
  }

  const user = await User.findById(userId);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const task = await Task.create({
    title,
    user: userId,
  });

  // push task to user
  user.tasks.push(task._id);
  await user.save();

  res.status(201).json(task);
});
