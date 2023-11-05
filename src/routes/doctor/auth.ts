import { Router } from "express";

import _ from "lodash";
import { asyncMiddleware } from "../../middlewares/utility";
import { login, register } from "../../controllers/doctor/doctor.auth";

const router = Router();

// LOGIN USER
router.post("/login", asyncMiddleware(login));

router.post("/register", asyncMiddleware(register));

export { router as doctorAuth };
