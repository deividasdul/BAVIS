import express from "express";
import cors from "cors";
import { getInterests } from "../controllers/interests.js";

const router = express.Router();

router.use(cors());

router.get("/", getInterests);

export default router;
