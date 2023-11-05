import { NextFunction, Request, Response, Router } from "express";
import { User } from "@prisma/client";
import Joi from "joi";
import _ from "lodash";
import bcrypt from "bcrypt";

import { PRISMA_CLIENT } from "../startup/prisma";
import { GenericAPIResponse } from "../types";
import { generateAuthToken } from "../controllers/users.controller";

const router = Router();

// LOGIN USER
router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  // VALIDATE REQUEST
  try {
    const { error } = validateReq(req.body);
    if (error) {
      return res.status(400).send({
        message: error.details[0].message,
        status: false,
      } as GenericAPIResponse);
    }
    const { email, password } = req.body as User;

    // CHECK IF USER EXISTS ALREADY
    const user = await PRISMA_CLIENT.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });
    if (!user) {
      return res.status(400).send({
        message: "Invalid email or password.",
        status: false,
      } as GenericAPIResponse);
    }

    // VALIDATE PASSWORD
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).send({
        message: "Invalid email or password.",
        status: false,
      } as GenericAPIResponse);
    }

    const data = _.omit(user, ["password"]);
    res.status(201).send({
      message: "Login success",
      status: true,
      data: {
        ...data,
        token: generateAuthToken({ id: user.id, type: user.type }),
      },
    } as GenericAPIResponse);
  } catch (error) {
    next(error);
  }
});

function validateReq(user: User) {
  const data = {
    email: Joi.string().email().label("Email").required(),
    password: Joi.string().min(5).max(200).label("Password").required(),
  };

  const schema = Joi.object<User>(data);
  return schema.validate(user);
}

export { router as authRouter };
