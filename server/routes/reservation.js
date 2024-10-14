import express from "express";
import { reserve } from "../controllers/reservation.js";
import cors from "cors";

const router = express.Router();

router.use(cors());

router.post("/", reserve);

export default router;
