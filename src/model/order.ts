import Client from '../database';

export type Order = {
  id?: string;
  product_id: string;
};

export class OrderStore {
  //CURRENT ORDER Operation
  async currentOrder(id: string): Promise<Order[]> {
    try {
      const conn = await Client.connect();
      const sql =
        'SELECT * FROM orders WHERE user_id = $1 AND status =  current';

      const result = await conn.query(sql, [id]);
      conn.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`Cannot get current order of user ${id} ${error}`);
    }
  }

  //COMPLETED ORDER Operation
  async completedOrder(id: string): Promise<Order[]> {
    try {
      const conn = await Client.connect();
      const sql =
        'SELECT * FROM orders WHERE user_id = $1 AND status =  completed';

      const result = await conn.query(sql, [id]);
      conn.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`Cannot get completed order of user ${id} ${error}`);
    }
  }
}
