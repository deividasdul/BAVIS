import { pool } from "../config.js";

const getInterests = async (_, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM interest ORDER BY category ASC`
    );
    res.status(200).json(result.rows);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { getInterests };
