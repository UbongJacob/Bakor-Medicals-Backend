import { Router } from "express";

import { asyncMiddleware } from "../../middlewares/utility";
import {
  createManyDoctors,
  getAllDoctors,
  login,
  register,
} from "../../controllers/doctor/doctor.auth";

const router = Router();

// LOGIN USER
router.post("/auth/login", asyncMiddleware(login));

router.post("/auth/register", asyncMiddleware(register));

router.get("/auth/create-many", asyncMiddleware(createManyDoctors));

router.get("/all", asyncMiddleware(getAllDoctors));

export { router as doctorRouter };
