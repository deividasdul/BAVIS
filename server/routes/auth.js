import express from "express";
import session from "express-session";
import passport from "passport";
import { Strategy } from "passport-local";
import env from "dotenv";
import cors from "cors";
import { logout, register } from "../controllers/auth.js";

env.config();

const router = express.Router();

router.use(cors());
router.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
router.use(passport.initialize());
router.use(passport.session());

// router.post(
//   "/login",
//   passport.authenticate("local", {
//     successRedirect: "/",
//     failureRedirect: "/login",
//   })
// );

router.get("/logout", logout);

router.post("/register", register);

// passport.use(
//   "local",
//   new Strategy(async function verify(username, password, cb) {
//     console.log("yo");

//     try {
//       console.log(username);
//       const result = await pool.query(
//         "SELECT * FROM student WHERE email = ($1) ",
//         [username]
//       );
//       if (result.rows.length > 0) {
//         const user = result.rows[0];
//         const storedHashedPassword = user.password;
//         bcrypt.compare(password, storedHashedPassword, (err, valid) => {
//           if (err) {
//             console.error("Error comparing passwords:", err);
//             return cb(err);
//           } else {
//             if (valid) {
//               return cb(null, user);
//             } else {
//               return cb(null, false);
//             }
//           }
//         });
//       } else {
//         return cb("Student not found");
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   })
// );

// passport.serializeUser((user, cb) => {
//   cb(null, user);
// });
// passport.deserializeUser((user, cb) => {
//   cb(null, user);
// });

export default router;
