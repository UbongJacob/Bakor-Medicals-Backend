import Joi from "joi";
import { Request, Response } from "express";

import { PRISMA_CLIENT } from "../startup/prisma";
import { Booking } from "@prisma/client";
import { message } from "../middlewares/utility";

export const bookAppointment = async (req: Request, res: Response) => {
  // VALIDATE REQUEST
  const { error } = validateReq(req.body);
  if (error)
    return res.status(400).send(message(false, error.details[0].message));

  const { doctorId, patientId, scheduledDateTime } = req.body as Booking;

  const appointment = await PRISMA_CLIENT.booking.create({
    data: { doctorId, patientId, scheduledDateTime },
  });

  res.status(201).send(message(true, "Session book success.", appointment));
};

export const getBookingByDoctorOrPatientId = async (
  req: Request,
  res: Response
) => {
  const id = req.params.id;
  if (!id)
    return res.status(400).send(message(false, "Invalid booking id provided."));

  const booking = await PRISMA_CLIENT.booking.findFirst({
    where: { OR: [{ patientId: id }, { doctorId: id }] },
  });
  if (!booking) {
    return res
      .status(404)
      .send(message(false, "The booking with the given ID was not found."));
  }
  res.send(message(true, "Booking found.", booking));
};

export const getAllBookings = async (req: Request, res: Response) => {
  const bookings = await PRISMA_CLIENT.booking.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: { doctor: true, patient: true },
  });

  res.send(message(true, "All bookings.", bookings));
};

function validateReq(details: Booking) {
  const data = {
    doctorId: Joi.string().min(10).max(200).required(),
    patientId: Joi.string().min(10).max(200).required(),
    scheduledDateTime: Joi.string().min(3).max(200).required(),
  };

  const schema = Joi.object<Booking>(data);
  return schema.validate(details);
}
