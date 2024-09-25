import express from "express";
import cors from "cors";
import { getUsers, deleteUser } from "../controllers/users.js";

const router = express.Router();

router.use(cors());

router.get("/", getUsers);
router.delete("/:id", deleteUser);

export default router;
