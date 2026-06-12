const express = require("express");
const router = express.Router();
const pool = require("../db");

/* =========================
   CREATE COLLECTION
========================= */
router.post("/create", async (req, res) => {
  try {
    const { name, description, image_url } = req.body;

    if (!name || name.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Collection name is required",
      });
    }

    const [result] = await pool.query(
      `INSERT INTO collections
       (name, description, image_url)
       VALUES (?, ?, ?)`,
      [name.trim(), description || "", image_url || ""],
    );

    res.status(201).json({
      success: true,
      message: "Collection created successfully",
      collectionId: result.insertId,
    });
  } catch (err) {
    console.error("Create Collection Error:", err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

/* =========================
   GET ALL COLLECTIONS
========================= */
router.get("/", async (req, res) => {
  try {
    const [collections] = await pool.query(
      `SELECT *
       FROM collections
       ORDER BY created_at DESC`,
    );

    res.json(collections);
  } catch (err) {
    console.error("Get Collections Error:", err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

/* =========================
   GET SINGLE COLLECTION
========================= */
router.get("/:id", async (req, res) => {
  try {
    const collectionId = req.params.id;

    const [rows] = await pool.query("SELECT * FROM collections WHERE id = ?", [
      collectionId,
    ]);

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Collection not found",
      });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error("Get Collection Error:", err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

/* =========================
   UPDATE COLLECTION
========================= */
router.put("/:id", async (req, res) => {
  try {
    const collectionId = req.params.id;

    const { name, description, image_url } = req.body;

    if (!name || name.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Collection name is required",
      });
    }

    const [result] = await pool.query(
      `UPDATE collections
       SET
         name = ?,
         description = ?,
         image_url = ?
       WHERE id = ?`,
      [name.trim(), description || "", image_url || "", collectionId],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Collection not found",
      });
    }

    res.json({
      success: true,
      message: "Collection updated successfully",
    });
  } catch (err) {
    console.error("Update Collection Error:", err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

/* =========================
   DELETE COLLECTION
========================= */
router.delete("/:id", async (req, res) => {
  try {
    const collectionId = req.params.id;

    const [result] = await pool.query("DELETE FROM collections WHERE id = ?", [
      collectionId,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Collection not found",
      });
    }

    res.json({
      success: true,
      message: "Collection deleted successfully",
    });
  } catch (err) {
    console.error("Delete Collection Error:", err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

module.exports = router;
