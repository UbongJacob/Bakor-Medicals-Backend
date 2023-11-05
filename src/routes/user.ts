import { Router } from "express";

import { auth } from "../middlewares/auth";
import {
  deleteUser,
  getAllUsers,
  getUserById,
  registerUser,
  updateUser,
} from "../controllers/users.controller";
import { asyncMiddleware } from "../middlewares/utility";
import _ from "lodash";

const router = Router();

// REGISTER USER
router.post("/", asyncMiddleware(registerUser));

// GET ALL USERS
router.get("/", auth, asyncMiddleware(getAllUsers));

// GET USER BY ID
router.get("/:id", auth, asyncMiddleware(getUserById));

// UPDATE USER
router.patch("/:id", asyncMiddleware(updateUser));

// DELETE USER
router.delete("/:id", asyncMiddleware(deleteUser));

export { router as usersRouter };
