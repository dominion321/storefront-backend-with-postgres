import { Application, Request, Response } from 'express';
import { OrderStore } from '../model/order';

const store = new OrderStore();

export class OrderHandler {
  async currentOrder(_req: Request, res: Response) {
    const user_id = _req.params.user_id;
    try {
      const userOrder = await store.currentOrder(user_id);
      res.status(200).json(userOrder);
      return;
    } catch (error) {
      throw new Error(`Error from orders current Order handler${error} `);
    }
  }

  async completedOrder(_req: Request, res: Response) {
    const user_id = _req.params.user_id;
    try {
      const userOrder = await store.completedOrder(user_id);
      res.status(200).json(userOrder);
      return;
    } catch (error) {
      throw new Error(`Error from orders completed Order handler${error} `);
    }
  }
}
