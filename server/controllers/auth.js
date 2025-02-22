import { pool } from "../config.js";
import bcrypt from "bcrypt";
import env from "dotenv";

env.config();

const saltRounds = parseInt(process.env.SALT_ROUNDS, 10);

const register = async (req, res) => {
  const {
    email,
    password,
    firstName,
    lastName,
    gender,
    phoneNumber,
    userStatus,
    faculty,
    userGroup,
  } = req.body;

  const fixedFirstName =
    firstName.slice(0, 1).toUpperCase() +
    firstName.slice(1, firstName.length).toLowerCase();

  const fixedLastName =
    lastName.slice(0, 1).toUpperCase() +
    lastName.slice(1, lastName.length).toLowerCase();

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
              `INSERT INTO "user" (email, password, role, status) VALUES ($1, $2, $3, $4) RETURNING *`,
              [email, hash, "User", "Active"]
            );

            const user = result.rows[0];
            await pool.query(
              `INSERT INTO contact (id, first_name, last_name, gender, phone_number, status, faculty, "group") 
              VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
              [
                user.id,
                fixedFirstName,
                fixedLastName,
                gender,
                phoneNumber,
                userStatus,
                faculty,
                userGroup,
              ]
            );

            req.login(user, (e) => {
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
