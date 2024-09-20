import express from "express";
import cors from "cors";
import { getDorms, getDormitoryRooms } from "../controllers/dorms.js";

const router = express.Router();

router.use(cors());

router.get("/", getDorms);
router.get("/:id", getDormitoryRooms);

export default router;
