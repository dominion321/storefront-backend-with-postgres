import { Request, Response } from 'express';
import { DashboardQueries } from '../services/dashboard';

const dashboard = new DashboardQueries();

export class DashboardHandlers {
  async productsInOrder(_req: Request, res: Response) {
    try {
      const result = await dashboard.productsInOrder();
      res.status(200).json(result);
    } catch (error) {
      throw new Error(`Error from Dashboard Handler ${error}`);
    }
  }
}
