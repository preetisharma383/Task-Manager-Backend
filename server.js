import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connect from "./src/db/connect.js";
import cookieParser from "cookie-parser";
import fs from "node:fs";
import path from "node:path";
import errorHandler from "./src/helpers/errorhandler.js";
import adminRoutes from "./src/routes/adminRoutes.js";

dotenv.config();

const port = process.env.PORT || 8000;
const app = express();

// ================= MIDDLEWARE =================

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ================= ROUTES =================

// Admin routes (explicit)
app.use("/api/admin", adminRoutes);

// ================= DYNAMIC ROUTES =================

const loadRoutes = async () => {
  const routesPath = path.resolve("./src/routes");
  const files = fs.readdirSync(routesPath);

  for (const file of files) {
    if (file === "adminRoutes.js") continue;

    const routeModule = await import(`./src/routes/${file}`);
    app.use("/api/v1", routeModule.default);
  }
};

// ================= ERROR HANDLER =================

app.use(errorHandler);

// ================= SERVER START =================

const startServer = async () => {
  try {
    await connect();
    console.log("Connected to database.....");

    await loadRoutes(); // load routes BEFORE listen

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
