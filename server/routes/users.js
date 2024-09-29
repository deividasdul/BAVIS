import express from "express";
import cors from "cors";
import {
  getUsers,
  deleteUser,
  getUser,
  putUser,
} from "../controllers/users.js";

const router = express.Router();

router.use(cors());

router.get("/", getUsers);
router.delete("/:id", deleteUser);
router.get("/:id", getUser);
router.put("/:id", putUser);

export default router;
