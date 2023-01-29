import { Application, Request, Response } from 'express';
import verifyAuthToken from '../middlewares/verifyAuthToken';
import { OrderStore } from '../model/order';

const store = new OrderStore();

const currentOrder = async (_req: Request, res: Response) => {
  const id = _req.params.id;
  try {
    const userOrder = await store.currentOrder(id);
    res.status(200).json(userOrder);
    return;
  } catch (error) {
    throw new Error(`Error from orders current Order handler${error} `);
  }
};

const completedOrder = async (_req: Request, res: Response) => {
  const id = _req.params.id;
  try {
    const userOrder = await store.completedOrder(id);
    res.status(200).json(userOrder);
    return;
  } catch (error) {
    throw new Error(`Error from orders completed Order handler${error} `);
  }
};

const orders_routes = (app: Application) => {
  app.get('/orders/:id', verifyAuthToken, currentOrder);
  app.get('/orders/completed/:id', verifyAuthToken, completedOrder);
};

export default orders_routes;
