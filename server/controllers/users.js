import pool from "../db/db.js";

// Get all users
const getUsers = async (_, res) => {
  try {
    const result = await pool.query(`SELECT 
          "user".id, "user".email, "user".role, contact.first_name, contact.last_name
          FROM "user"
          LEFT JOIN contact ON "user".id = contact.user_id;`);
    res.status(200).json(result.rows);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  const { id } = req.params;
  console.log(id);

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
      `SELECT * FROM contact WHERE contact.user_id = ($1)`,
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
      `UPDATE contact SET first_name = ($1), last_name = ($2) WHERE user_id = ($3) RETURNING *`,
      [first_name, last_name, id]
    );
    res.status(200).json(result.rows[0]);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { getUsers, deleteUser, getUser, putUser };
