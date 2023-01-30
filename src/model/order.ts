import Client from '../database';

export type Order = {
  id?: string;
  status: string;
  user_id: string;
};

export class OrderStore {
  //INDEX Operation
  async index(): Promise<Order[]> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM orders';

      const result = await conn.query(sql);
      conn.release();

      return result.rows;
    } catch (error) {
      throw new Error(`Error from Order Index ${error}`);
    }
  }

  //SHOW Operation
  async show(user_id: string): Promise<Order> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM orders WHERE user_id=($1)';

      const result = await conn.query(sql, [user_id]);
      conn.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`Cannot get order of ${user_id} ${error}`);
    }
  }

  //CREATE Operation
  async create(o: Order): Promise<Order> {
    const { status, user_id } = o;
    try {
      const conn = await Client.connect();
      const sql =
        'INSERT INTO orders (status, user_id) VALUES($1,$2) RETURNING *';

      const result = await conn.query(sql, [status, user_id]);
      conn.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`Cannot create order ${error}`);
    }
  }

  //CURRENT ORDER Operation
  async currentOrder(user_id: string): Promise<Order> {
    try {
      const conn = await Client.connect();
      const sql =
        "SELECT * FROM orders WHERE user_id=($1) AND status = 'current'";

      const result = await conn.query(sql, [user_id]);
      conn.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`Cannot get current order of user ${user_id} ${error}`);
    }
  }

  //COMPLETED ORDER Operation
  async completedOrder(id: string): Promise<Order[]> {
    try {
      const conn = await Client.connect();
      const sql =
        "SELECT * FROM orders WHERE user_id=($1) AND status =  'completed'";

      const result = await conn.query(sql, [id]);
      conn.release();

      return result.rows;
    } catch (error) {
      throw new Error(`Cannot get completed order of user ${id} ${error}`);
    }
  }
}
