import { Router } from "express";

import { asyncMiddleware } from "../middlewares/utility";
import {
  bookAppointment,
  getAllBookings,
  getBookingByDoctorOrPatientId,
} from "../controllers/booking.controller";

const router = Router();

// LOGIN USER
router.post("/", asyncMiddleware(bookAppointment));

router.get("/single/:id", asyncMiddleware(getBookingByDoctorOrPatientId));

router.get("/all", asyncMiddleware(getAllBookings));

export { router as bookingsRouter };
