import { Request, Response } from "express";
import Joi from "joi";
import { Patient } from "@prisma/client";
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
  const { email, password } = req.body as Patient;

  // CHECK IF patient EXISTS ALREADY
  const patient = await PRISMA_CLIENT.patient.findUnique({
    where: { email: email.toLowerCase().trim() },
  });
  if (!patient)
    return res.status(400).send(message(false, "Invalid email or password."));

  // VALIDATE PASSWORD
  const validPassword = await bcrypt.compare(password, patient.password);
  if (!validPassword)
    return res.status(400).send(message(false, "Invalid email or password."));

  const data = _.omit(patient, ["password"]);

  res
    .header(APP_HEADER_TOKEN, generateAuthToken({ id: data.id }))
    .status(201)
    .send(message(true, "Login success", data));
};

export const registerUser = async (req: Request, res: Response) => {
  // VALIDATE REQUEST
  const { error } = validatePatient(req.body, true);

  if (error)
    return res.status(400).send(message(false, error.details[0].message));

  const { email, firstName, lastName, password, phoneNumber } =
    req.body as Patient;

  // CHECK IF PATIENT EXISTS ALREADY
  let patient = await PRISMA_CLIENT.patient.findFirst({
    where: {
      OR: [
        { phoneNumber: { equals: phoneNumber.trim() } },
        { email: { equals: email.toLowerCase().trim() } },
      ],
    },
  });
  if (patient)
    return res
      .status(400)
      .send(
        message(
          false,
          "User with the given phone number or email already exist."
        )
      );

  const salt = await bcrypt.genSalt(10);

  // SAVE DATA INTO DATABASE
  patient = await PRISMA_CLIENT.patient.create({
    data: {
      email: email.toLowerCase().trim(),
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      phoneNumber: phoneNumber.trim(),
      password: await bcrypt.hash(password, salt),
    },
  });

  const data = _.omit(patient, ["password"]);
  res
    .header(APP_HEADER_TOKEN, generateAuthToken({ id: patient.id }))
    .status(201)
    .send(message(true, "Registration success.", data));
};
// UTILITIES
function validateReq(patient: Patient) {
  const data = {
    email: Joi.string().email().label("Email").required(),
    password: Joi.string().min(5).max(200).label("Password").required(),
  };

  const schema = Joi.object<Patient>(data);
  return schema.validate(patient);
}

// UTILITIES START
function validatePatient(patient: Patient, isRequired = false) {
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

  const schema = Joi.object<Patient>(patchData);
  return schema.validate(patient);
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
