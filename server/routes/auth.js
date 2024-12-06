import express from "express";
import session from "express-session";
import passport from "passport";
import { Strategy } from "passport-local";
import env from "dotenv";
import cors from "cors";
import { logout, register } from "../controllers/auth.js";
import bcrypt from "bcrypt";
import ejs from "ejs";

import jwt from "jsonwebtoken";
import { pool } from "../config.js";
import { sendMail } from "../utils/sendMail.js";

env.config();

const JWT_SECRET = process.env.JWT_SECRET;

const router = express.Router();

router.use(express.urlencoded({ extended: true }));

router.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

router.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    },
  })
);

router.use(passport.initialize());
router.use(passport.session());

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "An error occurred during login" });
    }
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    req.logIn(user, (err) => {
      if (err || user.status != "Active") {
        return res.status(500).json({ message: "Login failed" });
      }
      return res.status(200).json({ message: "Logged in successfully", user });
    });
  })(req, res, next);
});

router.get("/logout", logout);

router.get("/user", (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json({ user: req.user });
  } else {
    res.status(401).json({ message: "Not authenticated" });
  }
});

router.post("/register", register);

passport.use(
  "local",
  new Strategy(async function verify(username, password, cb) {
    try {
      const result = await pool.query(
        `SELECT * FROM "user" WHERE email = ($1) `,
        [username]
      );
      if (result.rows.length > 0) {
        const user = result.rows[0];
        const storedHashedPassword = user.password;
        bcrypt.compare(password, storedHashedPassword, (err, valid) => {
          if (err) {
            console.error("Error comparing passwords:", err);
            return cb(err);
          } else {
            if (valid) {
              return cb(null, user);
            } else {
              return cb(null, false);
            }
          }
        });
      } else {
        return cb("User not found");
      }
    } catch (err) {
      console.log(err);
    }
  })
);

router.post("/forgot-password", async (req, res) => {
  const { recipient } = req.body;

  try {
    const findUser = await pool.query(
      `SELECT * FROM "user" WHERE email = ($1)`,
      [recipient]
    );
    if (findUser.rows.length <= 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const secret = JWT_SECRET + findUser.rows[0].password;
    const token = jwt.sign(
      {
        email: findUser.rows[0].email,
        id: findUser.rows[0].id,
      },
      secret,
      { expiresIn: "5m" }
    );

    const link = `http://localhost:3000/auth/reset-password/${findUser.rows[0].id}/${token}`;

    const mailOptions = {
      from: {
        name: "BAVIS",
        address: process.env.GMAIL_ADDRESS,
      },
      to: [`${recipient}`],
      subject: `🔑 Slaptažodžio atkūrimas 🔑`,
      text: ``,
      html: `<html>
               <body>
                 <h1>Slaptažodžio atkūrimo užklausa</h1>
                 <p>Spustelėkite <a href="${link}">šią nuorodą</a>, kad atkurtumėte slaptažodį.</p>
                 <p>Jei neprašėte atkurti slaptažodžio, nespauskite jokios nuorodos ir ignoruokite šį el. laišką.</p>
               </body>
             </html>`,
    };

    sendMail(mailOptions);
    res.status(200).json({ message: "Sent" });
  } catch (e) {
    console.error(e);
  }
});

router.get("/reset-password/:id/:token", async (req, res) => {
  const { id, token } = req.params;

  try {
    const findUser = await pool.query(`SELECT * FROM "user" WHERE id = ($1)`, [
      id,
    ]);
    if (findUser.rows.length <= 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const secret = JWT_SECRET + findUser.rows[0].password;

    try {
      const verify = jwt.verify(token, secret);
      res.render("index.ejs");
    } catch (e) {
      res.send("Not verified");
      console.error(e);
    }
  } catch (e) {
    console.error(e);
  }
});

router.post("/reset-password/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  const { password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  if (password.length <= 8 || confirmPassword.length <= 8) {
    return res
      .status(400)
      .json({ message: "Password length must be greater than 8" });
  }

  try {
    const findUser = await pool.query(`SELECT * FROM "user" WHERE id = $1`, [
      id,
    ]);

    if (findUser.rows.length <= 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = findUser.rows[0];
    const secret = JWT_SECRET + user.password;

    try {
      const verify = jwt.verify(token, secret);

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      await pool.query(`UPDATE "user" SET password = ($1) WHERE id = ($2)`, [
        hashedPassword,
        id,
      ]);

      res
        .status(200)
        .json({ message: "Password has been successfully updated" });
    } catch (e) {
      console.error(e);
      return res.status(400).json({ message: "Invalid or expired token" });
    }
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Server error" });
  }
});

passport.serializeUser((user, cb) => {
  cb(null, user);
});
passport.deserializeUser((user, cb) => {
  cb(null, user);
});

export default router;
