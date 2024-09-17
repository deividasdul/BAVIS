import pool from "../db/db.js";

const getDorms = async (_, res) => {
  try {
    const result = await pool.query(`SELECT * FROM dormitory`);
    res.json(result.rows);
  } catch (e) {
    console.error(e.message);
  }
};

export { getDorms };
