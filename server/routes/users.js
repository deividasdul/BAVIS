import express from "express";
import cors from "cors";
import { getUsers, deleteUser, getUser } from "../controllers/users.js";

const router = express.Router();

router.use(cors());

router.get("/", getUsers);
router.delete("/:id", deleteUser);
router.get("/:id", getUser);
router.put("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    res.status(200).json(result.rows[0]);
  } catch (e) {
    console.error(e);
  }
});
// router.patch("/:id", patchUser);

export default router;
