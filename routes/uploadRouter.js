const express = require("express");
const router = express.Router();
const multer = require("multer");
const pool = require("../db");

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

// File Validation
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "application/pdf",
    "image/png",
    "image/jpeg",
    "image/jpg",
    "audio/mpeg",
    "audio/wav",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Unsupported file type"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 100 * 1024 * 1024,
  },
});

// Upload Resource
router.post("/resource", upload.single("file"), async (req, res) => {
  try {
    const { title, description, tags, collection } = req.body;

    if (!req.file) {
      return res.status(400).json({
        status: "error",
        message: "Please upload a file",
      });
    }

    await pool.query(
      `
      INSERT INTO resources
      (
        title,
        description,
        tags,
        collection_name,
        file_name,
        file_path
      )
      VALUES (?, ?, ?, ?, ?, ?)
      `,
      [
        title,
        description,
        tags || null,
        collection || null,
        req.file.originalname,
        req.file.path,
      ],
    );

    res.status(201).json({
      status: "success",
      message: "Resource uploaded successfully",
      data: {
        title,
        description,
        tags,
        collection,
        fileName: req.file.originalname,
        filePath: req.file.path,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
});

module.exports = router;
