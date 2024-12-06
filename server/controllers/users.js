import { pool } from "../config.js";
import bcrypt from "bcrypt";

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

    // Destroy the session on the server side (if you're using express-session)
    if (req.session) {
      req.session.destroy((err) => {
        if (err) {
          console.error("Failed to destroy session:", err);
        }
      });
    }

    // Clear the connect.sid cookie
    res.clearCookie("connect.sid", { path: "/" });
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
  const { id } = req.params;

  const {
    phoneNumber,
    oldPassword,
    newPassword,
    confirmNewPassword,
    interests,
  } = req.body;

  try {
    await pool.query(
      `UPDATE contact SET phone_number = ($1) WHERE id = ($2) RETURNING *`,
      [phoneNumber, id]
    );

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

    res
      .status(200)
      .json({ message: "User and interests updated successfully" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
};

const changePassword = async (req, res) => {
  const { id } = req.params;
  const { oldPassword, newPassword } = req.body;

  try {
    const selectedUser = await pool.query(
      `SELECT * FROM "user" WHERE id = $1`,
      [id]
    );

    bcrypt.compare(oldPassword, selectedUser.rows[0].password, (err, valid) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
      }

      if (!valid) {
        return res.status(400).json({ message: "Wrong password" });
      }

      bcrypt.hash(newPassword, 10, async (e, hash) => {
        if (e) {
          console.error(e);
          return res.status(500).json({ message: "Internal server error" });
        }

        try {
          await pool.query(`UPDATE "user" SET password = $1 WHERE id = $2`, [
            hash,
            id,
          ]);
          return res
            .status(200)
            .json({ message: "Password updated successfully" });
        } catch (e) {
          console.error(e);
        }
      });
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export {
  getUsers,
  deleteUser,
  getUser,
  putUser,
  patchUser,
  getUserInterests,
  changePassword,
};
