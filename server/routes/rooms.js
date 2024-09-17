import express from "express";
import cors from "cors";
import {
  getRooms,
  getRoom,
  postRoom,
  putRoom,
  deleteRoom,
} from "../controllers/rooms.js";

const router = express.Router();

router.use(cors());

router.get("/", getRooms);
router.get("/:id", getRoom);
router.post("/", postRoom);
router.put("/:id", putRoom);
router.delete("/:id", deleteRoom);

export default router;
