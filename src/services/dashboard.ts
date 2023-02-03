import Client from '../database';

export class DashboardQueries {
  //Getting all products added to an order
  async productsInOrder(): Promise<
    { name: string; price: number; order_id: string }[]
  > {
    try {
      const conn = await Client.connect();
      const sql =
        'SELECT name, price, order_id FROM products INNER JOIN orders_products ON products.id = orders_products.product_id';

      const queryResult = await conn.query(sql);
      conn.release();

      return queryResult.rows;
    } catch (error) {
      throw new Error(`Error from Dashboard Queries ${error}`);
    }
  }
}
