import dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

dotenv.config();

const pepper = process.env.TOKEN_SECRET;

const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers.authorization as string;
    const token = authorizationHeader.split(' ')[1];
    jwt.verify(token, pepper as string);

    next();
  } catch (error) {
    res.status(401);
    throw `Access Denied`;
  }
};

export default verifyAuthToken;
