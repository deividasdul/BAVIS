import express from "express";
import cors from "cors";
import {
  getUsers,
  deleteUser,
  getUser,
  putUser,
  patchUser,
  getUserInterests,
  changePassword,
  deactivateUser,
  activateUser,
} from "../controllers/users.js";

const router = express.Router();

router.use(cors());

router.get("/", getUsers);
router.patch("/deactivate/:id", deactivateUser);
router.patch("/activate/:id", activateUser), router.delete("/:id", deleteUser);
router.get("/:id", getUser);
router.put("/:id", putUser);
router.patch("/:id", patchUser);
router.get("/:id/interests", getUserInterests);
router.post("/change-password/:id", changePassword);

export default router;
