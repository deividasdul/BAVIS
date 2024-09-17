import express from "express";
import cors from "cors";
import { getDorms } from "../controllers/dorms.js";

const router = express.Router();

router.use(cors());

router.get("/", getDorms);

export default router;
