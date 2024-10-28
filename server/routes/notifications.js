import express from "express";

import { pool } from "../config.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const result = await pool.query(
    `SELECT * FROM notification WHERE status = 'active'`
  );
  res.json(result.rows);
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `UPDATE notification SET status = 'inactive' WHERE id = $1`,
      [id]
    );
    res.json(result.rows[0]);
  } catch (e) {
    console.error(e);
  }
});

router.post("/", async (req, res) => {
  const { message } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO notification (message, status) VALUES ($1, $2)`,
      [message, "active"]
    );
    res.json(result.rows[0]);
  } catch (e) {
    console.error(e);
  }
});

export default router;
