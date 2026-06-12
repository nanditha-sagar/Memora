const express = require("express");
const path = require("path");

const authRouter = require("./routes/authRouter");
const uploadRouter = require("./routes/uploadRouter");
const collectionRouter = require("./routes/collectionRouter");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static(path.join(__dirname, "public")));

// Uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Home Route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

// API Routes
app.use("/auth", authRouter);
app.use("/upload", uploadRouter);
app.use("/collections", collectionRouter);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: "Route not found",
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    status: "error",
    message: err.message || "Internal Server Error",
  });
});

module.exports = app;
