// import { Request, Response } from "express";
// import _ from "lodash";
// import config from "config";
// import Joi from "joi";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";

// import { PRISMA_CLIENT } from "../startup/prisma";
// import { User, UserType } from "@prisma/client";
// import { message } from "../middlewares/utility";
// import { APP_HEADER_TOKEN, JWT_PRIVATE_KEY } from "../startup/config";

// // GET ALL USERS START
// export const getAllUsers = async (req: Request, res: Response) => {
//   const allUsers = await PRISMA_CLIENT.user.findMany();
//   const users = allUsers.map((user) => _.omit(user, ["password"]));
//   return res.send(message(true, "Get users success", users));
// };
// // GET ALL USERS END

// // REGISTER USER START
// export const registerUser = async (req: Request, res: Response) => {
//   // VALIDATE REQUEST
//   const { error } = validateUser(req.body, true);

//   if (error)
//     return res.status(400).send(message(false, error.details[0].message));

//   const { email, firstName, lastName, password } = req.body as User;

//   // CHECK IF USER EXISTS ALREADY
//   let user = await PRISMA_CLIENT.user.findUnique({
//     where: { email: email.toLowerCase().trim() },
//   });
//   if (user) return res.status(400).send(message(false, "Email already exist."));

//   const salt = await bcrypt.genSalt(10);

//   // SAVE DATA INTO DATABASE
//   user = await PRISMA_CLIENT.user.create({
//     data: {
//       email: email.toLowerCase().trim(),
//       firstName: firstName.trim(),
//       lastName: lastName.trim(),
//       password: await bcrypt.hash(password, salt),
//     },
//   });

//   const data = _.omit(user, ["password"]);
//   res
//     .header(
//       APP_HEADER_TOKEN,
//       generateAuthToken({ id: user.id, type: "PATIENT" })
//     )
//     .status(201)
//     .send(message(true, "Registration success.", data));
// };
// // REGISTER USER END

// //   GET USER BY ID START
// export const getUserById = async (req: Request, res: Response) => {
//   const request = req as RequestWithUserToken;
//   let id;
//   if (request.user.type === "ADMIN") {
//     id = req.params.id;
//   } else {
//     id = request.user.id;
//   }

//   // FIND THE USER
//   const user = await findUser(id, res);
//   if (!user) return;

//   // SEND THE USER TO THE CLIENT
//   const data = _.omit(user, ["password"]);
//   res.send(message(true, "User found.", data));
// };
// //   GET USER BY ID END

// // UPDATE USER START
// export const updateUser = async (req: Request, res: Response) => {
//   // VALIDATE REQUEST
//   const { error, value } = validateUser(req.body);
//   if (error)
//     return res.status(400).send(message(false, error.details[0].message));

//   if (Object.keys(value).length < 1)
//     return res.status(400).send(message(false, "No field updated."));

//   // FIND THE USER
//   const user = await findUser(req.params.id, res);
//   if (!user) return;

//   // UPDATE THE USER
//   const { firstName, lastName } = req.body as User;
//   const updatedUser = await PRISMA_CLIENT.user.update({
//     where: { id: req.params.id },
//     data: { firstName, lastName },
//   });
//   const data = _.omit(updatedUser, ["password"]);
//   res.status(200).send(message(true, "Profile update success.", data));
// };
// // UPDATE USER END

// // DELETE USER START
// export const deleteUser = async (req: Request, res: Response) => {
//   // FIND THE USER
//   const user = await findUser(req.params.id, res);
//   if (!user) return;

//   //  DELETE USER
//   const deletedUser = await PRISMA_CLIENT.user.delete({
//     where: { id: req.params.id },
//   });
//   const data = _.omit(deletedUser, ["password"]);
//   res.status(200).send(message(true, "User delete success.", data));
// };
// // DELETE USER END

// const findUser = async (id: string, res: Response) => {
//   const user = await PRISMA_CLIENT.user.findUnique({ where: { id } });
//   if (!user) {
//     res
//       .status(404)
//       .send(message(false, "The user with the given ID was not found."));
//     return false;
//   } else return user;
// };

// // UTILITIES END
