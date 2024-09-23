import express from "express";
import cors from "cors";
import {
  getDorms,
  getDormRooms,
  postDorm,
  putDorm,
  deleteDorm,
} from "../controllers/dorms.js";

const router = express.Router();

router.use(cors());

router.get("/", getDorms);
router.get("/:id", getDormRooms);
router.post("/", postDorm);
router.put("/:id", putDorm);
router.delete("/:id", deleteDorm);

export default router;
