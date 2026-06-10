const express = require("express");
const path = require("path");

const authRouter = require("./routes/authRouter");
const uploadRouter = require("./routes/uploadRouter");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static(path.join(__dirname, "public")));

// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Home Route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

// Routes
app.use("/auth", authRouter);
app.use("/upload", uploadRouter);


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
