import express from "express";
import cors from "cors";
import { getInterests, getTopInterests } from "../controllers/interests.js";

const router = express.Router();

router.use(cors());

router.get("/", getInterests);
router.get("/top", getTopInterests);

export default router;
