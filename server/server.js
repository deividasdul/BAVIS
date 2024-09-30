import express from "express";
import env from "dotenv";
import cors from "cors";
import rooms from "./routes/rooms.js";
import auth from "./routes/auth.js";
import dorms from "./routes/dorms.js";
import users from "./routes/users.js";
import interests from "./routes/interests.js";

env.config();

const app = express();

const port = process.env.SERVER_PORT || 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/rooms", rooms);
app.use("/api/v1/dorms", dorms);
app.use("/api/v1/users", users);
app.use("/api/v1/interests", interests);
app.use("/auth", auth);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
