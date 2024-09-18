import pool from "../db/db.js";
import bcrypt from "bcrypt";
import env from "dotenv";

env.config();

const saltRounds = process.env.SALT_ROUNDS;

const register = async (req, res) => {
  const { email, password } = req.body;

  try {
    const checkStudents = await pool.query(
      `SELECT * FROM student WHERE email = ($1)`,
      [email]
    );
    if (checkStudents.rows.length > 0) {
      console.log(`User exists`);
      res.redirect("http://localhost:5173/login");
    } else {
      bcrypt.hash(password, saltRounds, async (e, hash) => {
        if (e) {
          console.error(e);
        } else {
          console.log(hash);
          try {
            const result = await pool.query(
              `INSERT INTO student (email, password) VALUES ($1, $2) RETURNING *`,
              [email, hash]
            );
            const student = result.rows[0];
            req.login(student, (e) => {
              console.log("success");
              res.redirect("/");
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
  req.logout(function (e) {
    if (e) {
      return next(e);
    }
    console.log("Logged out");
    // res.redirect("/");
  });
};

export { register, logout };
