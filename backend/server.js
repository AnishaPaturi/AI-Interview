import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { connectDB } from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import practiceRoutes from "./routes/practiceRoutes.js";

dotenv.config();

/* ---------------- DATABASE ---------------- */

connectDB();

/* ---------------- APP INIT ---------------- */

const app = express();

/* ---------------- MIDDLEWARE ---------------- */

app.use(cors());
app.use(express.json());

/* ---------------- ROUTES ---------------- */

app.get("/", (req, res) => {
  res.json({
    message: "AI Interview Backend Running 🚀"
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/practice", practiceRoutes);

/* ---------------- ERROR HANDLING ---------------- */

app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    error: "Something went wrong"
  });
});

/* ---------------- SERVER ---------------- */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});