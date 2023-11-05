import { Router } from "express";

import _ from "lodash";
import { asyncMiddleware } from "../../middlewares/utility";
import { login, registerUser } from "../../controllers/patient/patient.auth";

const router = Router();

// LOGIN USER
router.post("/login", asyncMiddleware(login));

router.post("/register", asyncMiddleware(registerUser));

export { router as patientAuth };
