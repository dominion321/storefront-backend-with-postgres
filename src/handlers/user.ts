import { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import { User, UserStore } from '../model/user';
import jwt from 'jsonwebtoken';
import verifyAuthToken from '../middlewares/verifyAuthToken';

dotenv.config();

const { TOKEN_SECRET } = process.env;

const store = new UserStore();

const index = async (_req: Request, res: Response) => {
  try {
    const users = await store.index();
    res.status(200).json(users);

    return;
  } catch (error) {
    throw new Error(`Cannot get users in handler ${error}`);
  }
};

const create = async (_req: Request, res: Response) => {
  const user: User = {
    username: _req.body.username,
    password: _req.body.password,
  };

  try {
    const newUser = await store.create(user);
    let token = jwt.sign({ user: newUser }, String(TOKEN_SECRET));
    console.log(token);
  } catch (err) {
    res.status(400);
    res.json(String(err) + user);
  }
};

const users_routes = async (app: Application) => {
  try {
    app.get('/users', verifyAuthToken, index);
    app.post('/users/create', verifyAuthToken, create);
  } catch (err) {
    throw new Error(`Could not parse user routes ${err}`);
  }
};

export default users_routes;
