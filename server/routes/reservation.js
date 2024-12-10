import express from "express";
import { reserve, stay } from "../controllers/reservation.js";
import cors from "cors";

const router = express.Router();

router.use(cors());

router.post("/", reserve);
router.get("/:id", stay);

export default router;
