import express from "express";
import {
  reserve,
  stay,
  getReservations,
  acceptReservation,
  delayReservation,
  cancelReservation,
} from "../controllers/reservation.js";
import cors from "cors";

const router = express.Router();

router.use(cors());

router.get("/reservations", getReservations);
router.post("/", reserve);
router.get("/:id", stay);

router.post("/accept/:id", acceptReservation);
router.post("/delay/:id", delayReservation);
router.post("/cancel/:id", cancelReservation);

export default router;
