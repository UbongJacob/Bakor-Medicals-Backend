import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "config";

import { GenericAPIResponse } from "../types";
import { APP_HEADER_TOKEN, JWT_PRIVATE_KEY } from "../startup/config";

export function auth(req: Request, res: Response, next: NextFunction) {
  const token = req.header(APP_HEADER_TOKEN);
  if (!token) {
    return res.status(401).send({
      message: "Access denied. No token provided.",
      status: false,
    } as GenericAPIResponse);
  }

  try {
    const decoded = jwt.verify(token, config.get(JWT_PRIVATE_KEY));
    //   @ts-ignore
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send({
      message: "Invalid token.",
      status: false,
    } as GenericAPIResponse);
  }
}
