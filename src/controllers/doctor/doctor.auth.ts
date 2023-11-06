import { Request, Response } from "express";
import Joi from "joi";
import { Doctor } from "@prisma/client";
import bcrypt from "bcrypt";
import _ from "lodash";
import jwt from "jsonwebtoken";
import config from "config";

import { message } from "../../middlewares/utility";
import { PRISMA_CLIENT } from "../../startup/prisma";
import { APP_HEADER_TOKEN, JWT_PRIVATE_KEY } from "../../startup/config";

export const login = async (req: Request, res: Response) => {
  // VALIDATE REQUEST
  const { error } = validateReq(req.body);
  if (error) {
    return res.status(400).send(message(false, error.details[0].message));
  }
  const { email, password } = req.body as Doctor;

  // CHECK IF doctor EXISTS ALREADY
  const doctor = await PRISMA_CLIENT.doctor.findUnique({
    where: { email: email.toLowerCase().trim() },
    include: { specialty: true, bookings: true },
  });
  if (!doctor)
    return res.status(400).send(message(false, "Invalid email or password."));

  // VALIDATE PASSWORD
  const validPassword = await bcrypt.compare(password, doctor.password);
  if (!validPassword)
    return res.status(400).send(message(false, "Invalid email or password."));

  const data = _.omit(doctor, ["password"]);

  res
    .header(APP_HEADER_TOKEN, generateAuthToken({ id: data.id }))
    .status(200)
    .send(message(true, "Login success", data));
};

export const register = async (req: Request, res: Response) => {
  // VALIDATE REQUEST
  const { error } = validatedoctor(req.body, true);

  if (error)
    return res.status(400).send(message(false, error.details[0].message));

  const { email, firstName, lastName, password, phoneNumber } =
    req.body as Doctor;

  // CHECK IF Doctor EXISTS ALREADY
  let doctor = await PRISMA_CLIENT.doctor.findFirst({
    where: {
      OR: [
        { phoneNumber: { equals: phoneNumber.trim() } },
        { email: { equals: email.toLowerCase().trim() } },
      ],
    },
  });
  if (doctor)
    return res
      .status(400)
      .send(
        message(
          false,
          "Doctor with the given phone number or email already exist."
        )
      );

  const salt = await bcrypt.genSalt(10);

  // SAVE DATA INTO DATABASE
  doctor = await PRISMA_CLIENT.doctor.create({
    data: {
      email: email.toLowerCase().trim(),
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      phoneNumber: phoneNumber.trim(),
      password: await bcrypt.hash(password, salt),
      specialty: {
        create: {
          title: "General Practitioner",
        },
      },
    },
    include: { specialty: true },
  });

  const data = _.omit(doctor, ["password"]);
  res
    .header(APP_HEADER_TOKEN, generateAuthToken({ id: doctor.id }))
    .status(201)
    .send(message(true, "Registration success.", data));
};
// UTILITIES
function validateReq(doctor: Doctor) {
  const data = {
    email: Joi.string().email().label("Email").required(),
    password: Joi.string().min(5).max(200).label("Password").required(),
  };

  const schema = Joi.object<Doctor>(data);
  return schema.validate(doctor);
}

// UTILITIES START
function validatedoctor(doctor: Doctor, isRequired = false) {
  const patchData = {
    firstName: Joi.string().min(3).max(200).label("First Name"),
    lastName: Joi.string().min(3).max(200).label("Last Name"),
    email: Joi.string().email().min(3).max(200).label("Email"),
    password: Joi.string().min(5).max(200).label("Password"),
    phoneNumber: Joi.string().min(3).max(200).label("Phone number"),
  };

  if (isRequired) {
    for (const key in patchData) {
      // @ts-ignore
      patchData[key] = patchData[key].required();
    }
  }

  const schema = Joi.object<Doctor>(patchData);
  return schema.validate(doctor);
}

export function generateAuthToken({ id }: UserToken): string {
  return jwt.sign({ id }, config.get(JWT_PRIVATE_KEY));
}

interface UserToken {
  id: string;
}

export interface RequestWithUserToken extends Request {
  user: UserToken;
}
