import pool from "../db/db.js";

// Get all users
const getUsers = async (_, res) => {
  try {
    const result = await pool.query(`SELECT 
          "user".id, "user".email, "user".role, contact.first_name, contact.last_name
          FROM "user"
          LEFT JOIN contact ON "user".id = contact.id
          ORDER BY "user".id ASC
          `);
    res.status(200).json(result.rows);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `DELETE FROM "user" WHERE id = ($1) RETURNING *`,
      [id]
    );
    res.status(200).json(result.data);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `SELECT * FROM contact WHERE contact.id = ($1)`,
      [id]
    );
    res.status(200).json(result.rows[0]);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
};

const putUser = async (req, res) => {
  const { id } = req.params;

  const { first_name, last_name } = req.body;

  try {
    const result = await pool.query(
      `UPDATE contact SET first_name = ($1), last_name = ($2) WHERE id = ($3) RETURNING *`,
      [first_name, last_name, id]
    );
    res.status(200).json(result.rows[0]);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getUserInterests = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `SELECT * FROM user_interest WHERE contact_id = ($1)`,
      [id]
    );
    res.status(200).json(result.rows);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
};

const patchUser = async (req, res) => {
  const interests = req.body;
  const { id } = req.params;

  try {
    const interestsResult = await pool.query(
      `SELECT interest_id FROM user_interest WHERE contact_id = $1`,
      [id]
    );

    const existingInterests = interestsResult.rows.map(
      (row) => row.interest_id
    );

    for (const interest of interests) {
      if (existingInterests.includes(interest)) {
        await pool.query(
          `UPDATE user_interest SET interest_id = ($1) WHERE contact_id = ($2) AND interest_id = ($1) RETURNING *`,
          [interest, id]
        );
      } else {
        await pool.query(
          `INSERT INTO user_interest (interest_id, contact_id) VALUES ($1, $2) RETURNING *`,
          [interest, id]
        );
      }
    }

    for (const existingInterest of existingInterests) {
      if (!interests.includes(existingInterest)) {
        await pool.query(
          `DELETE FROM user_interest WHERE interest_id = ($1) AND contact_id = ($2)`,
          [existingInterest, id]
        );
      }
    }
    res.status(200).json({ message: "Interests updated successfully" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { getUsers, deleteUser, getUser, putUser, patchUser, getUserInterests };
