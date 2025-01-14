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

const getTopInterests = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT interest.interest, COUNT(user_interest.interest_id) 
      FROM user_interest 
      JOIN interest 
      ON user_interest.interest_id = interest.id 
      GROUP BY interest.interest 
      ORDER BY COUNT(user_interest.interest_id) DESC 
      LIMIT 5;`
    );
    res.status(200).json(result.rows);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { getInterests, getTopInterests };
