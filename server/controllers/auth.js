import pool from "../db/db.js";
import bcrypt from "bcrypt";
import env from "dotenv";

env.config();

const saltRounds = parseInt(process.env.SALT_ROUNDS, 10);

const register = async (req, res) => {
  const { email, password } = req.body;

  try {
    const checkUsers = await pool.query(
      `SELECT * FROM "user" WHERE email = ($1)`,
      [email]
    );
    if (checkUsers.rows.length > 0) {
      res.json({ message: "Email address is already in use" });
    } else {
      bcrypt.hash(password, saltRounds, async (e, hash) => {
        if (e) {
          console.error(e);
        } else {
          try {
            const result = await pool.query(
              `INSERT INTO "user" (email, password, role) VALUES ($1, $2, $3) RETURNING *`,
              [email, hash, "User"]
            );
            const student = result.rows[0];
            req.login(student, (e) => {
              res.json({ message: "User registered successfully" });
            });
          } catch (e) {
            console.error(e);
          }
        }
      });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
};

const logout = (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.session.destroy();
    res.clearCookie("connect.sid");
    res.status(200).json({ message: "Logged out successfully" });
  });
};

export { register, logout };
