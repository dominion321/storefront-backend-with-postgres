import { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import { User, UserStore } from '../model/user';
import jwt from 'jsonwebtoken';

dotenv.config();

const { TOKEN_SECRET } = process.env;

const store = new UserStore();

export class UserHandler {
  async index(_req: Request, res: Response) {
    try {
      const users = await store.index();
      res.status(200).json(users);
    } catch (error) {
      throw new Error(`Cannot get users in handler ${error}`);
    }
  }

  async create(_req: Request, res: Response) {
    const user: User = {
      firstname: _req.body.firstname,
      lastname: _req.body.lastname,
      password: _req.body.password,
    };

    try {
      const newUser = await store.create(user);
      let token = jwt.sign({ user: newUser }, String(TOKEN_SECRET));
      res.status(200).json(token);
    } catch (err) {
      res.status(400);
      res.json(String(err) + user);
    }
  }

  async show(_req: Request, res: Response) {
    try {
      const id = _req.params.id;
      const result = await store.show(id);
      res.status(200).json(result);
    } catch (error) {
      throw new Error(`Cannot get user in handler ${error}`);
    }
  }
}

// const authenticate = async (_req: Request, res: Response) => {
//   const {firstname, password} = _req.body
//   const result = await store.authenticate(firstname, password);
//   res.status(201).json(result);
// }

// const users_routes = async (app: Application) => {
//   try {
//     app.get('/users', verifyAuthToken, index);
//     app.post('/users', verifyAuthToken,create);
//     // app.post('/users/authenticate', authenticate);
//   } catch (err) {
//     throw new Error(`Could not parse user routes ${err}`);
//   }
// };

// export default users_routes;
