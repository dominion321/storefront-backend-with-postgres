import dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

dotenv.config();

const { TOKEN_SECRET } = process.env;

const verifyAuthToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader?.split(' ')[1];
    const decoded = jwt.verify(String(token), String(TOKEN_SECRET));

    next();
  } catch (error) {
    res.status(401);
    throw `Error from verify ${error}`;
  }
};

export default verifyAuthToken;
