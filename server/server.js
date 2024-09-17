import express from "express";
import env from "dotenv";

import rooms from "./routes/rooms.js";
import auth from "./routes/auth.js";
import dorms from "./routes/dorms.js";

env.config();

const app = express();
const port = process.env.SERVER_PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/rooms", rooms);
app.use("/api/v1/dorms", dorms);
// app.use("/auth", auth);

app.listen(port, () => {
  console.log(`Server started`);
});
