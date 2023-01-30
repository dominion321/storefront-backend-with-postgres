import { Application, Request, Response } from 'express';
import { Order, OrderStore } from '../model/order';

const store = new OrderStore();

export class OrderHandler {
  async index(_req: Request, res: Response) {
    try {
      const result = await store.index();
      res.status(200).json(result);
    } catch (error) {
      throw new Error(`Error from orders index handler ${error}`);
    }
  }

  async show(_req: Request, res: Response) {
    const user_id = _req.params.user_id;
    try {
      const result = await store.show(user_id);
      res.status(200).json(result);
    } catch (error) {
      throw new Error(`Error from orders show handler ${error}`);
    }
  }

  async create(_req: Request, res: Response) {
    const order: Order = {
      status: _req.body.status,
      user_id: _req.body.user_id,
    };
    try {
      const result = await store.create(order);
      res.status(200).json(result);
    } catch (error) {
      throw new Error(`Error from orders create handler ${error}`);
    }
  }

  async currentOrder(_req: Request, res: Response) {
    const user_id = _req.params.user_id;
    try {
      const userOrder = await store.currentOrder(user_id);
      res.status(200).json(userOrder);
    } catch (error) {
      throw new Error(`Error from orders current Order handler${error} `);
    }
  }

  async completedOrder(_req: Request, res: Response) {
    const user_id = _req.params.user_id;
    try {
      const userOrder = await store.completedOrder(user_id);
      res.status(200).json(userOrder);
    } catch (error) {
      throw new Error(`Error from orders completed Order handler${error} `);
    }
  }
}
