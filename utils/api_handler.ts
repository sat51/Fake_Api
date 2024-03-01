import { NextFunction, Request, Response } from "express";
import winston from "winston";

const createLogger = (): winston.Logger =>
  winston.createLogger({
    level: "info",
    format: winston.format.json(),
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: "combined.log" }),
    ],
  });

const logger = createLogger();

export const loggingMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info(`Method: ${req.method}, Path: ${req.url}, Status:${res.statusCode}`);
  next();
};