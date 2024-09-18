import pool from "../db/db.js";

// Get all dormitories
const getDorms = async (_, res) => {
  try {
    const result = await pool.query(`SELECT * FROM dormitory ORDER BY id ASC`);
    res.status(200).json(result.rows);
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { getDorms };
