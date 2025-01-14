import express from "express";
import env from "dotenv";
import cors from "cors";

// API routes
import rooms from "./routes/rooms.js";
import auth from "./routes/auth.js";
import dorms from "./routes/dorms.js";
import users from "./routes/users.js";
import interests from "./routes/interests.js";
import reservation from "./routes/reservation.js";
import notifications from "./routes/notifications.js";

import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

import { pool } from "./config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../client/public/images/profile-images"));
  },
  filename: function (req, file, cb) {
    const userId = req.params.id;
    const fileExtension = path.extname(file.originalname);

    const newFileName = `${userId}${fileExtension}`;

    cb(null, newFileName);
  },
});

const upload = multer({ storage });

env.config();

const app = express();
const port = process.env.SERVER_PORT || 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true, charset: "utf-8" }));
app.use(express.json({ charset: "utf-8" }));

app.use("/api/v1/rooms", rooms);
app.use("/api/v1/dorms", dorms);
app.use("/api/v1/users", users);
app.use("/api/v1/interests", interests);
app.use("/auth", auth);
app.use("/api/v1/reservation", reservation);
app.use("/api/v1/notifications", notifications);

app.post("/upload/:id", upload.single("file"), async (req, res) => {
  const { id } = req.params;

  try {
    const newFileName = `${id}${path.extname(req.file.originalname)}`;
    await pool.query("UPDATE contact SET avatar_url = $1 WHERE id = $2", [
      `/images/profile-images/${newFileName}`,
      id,
    ]);
    res.json({ filename: newFileName });
  } catch (e) {
    console.error(e);
    res.status(500).send("Error uploading file");
  }
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

app.get("/userData", async (req, res) => {
  try {
    const result = await pool.query(`SELECT count("user".id) AS userCount, 
      count("user".status) FILTER (WHERE "user".status = 'Active') AS activeCount
      FROM "user"`);
    res.status(200).json(result.rows);
  } catch (e) {
    console.log(e);
  }
});

app.get("/userData/genders", async (req, res) => {
  try {
    const result =
      await pool.query(`SELECT count(contact.gender) FILTER (WHERE contact.gender = 'Vyras' AND contact.status = 'Studentas') AS maleStudents,
        count(contact.gender) FILTER (WHERE contact.gender = 'Moteris' AND contact.status = 'Studentas') AS femaleStudents,
        count(contact.gender) FILTER (WHERE contact.gender = 'Vyras' AND contact.status = 'Dėstytojas') AS maleTeachers,
        count(contact.gender) FILTER (WHERE contact.gender = 'Moteris' AND contact.status = 'Dėstytojas') AS femaleTeachers,
        count(contact.gender) FILTER (WHERE contact.gender = 'Vyras' AND contact.status = 'Svečias') AS maleGuests,
        count(contact.gender) FILTER (WHERE contact.gender = 'Moteris' AND contact.status = 'Svečias') AS femaleGuests
        FROM contact`);
    res.status(200).json(result.rows);
  } catch (e) {
    console.log(e);
  }
});
