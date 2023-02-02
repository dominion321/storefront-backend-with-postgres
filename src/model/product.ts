import Client from '../database';

export type Product = {
  id?: string;
  name: string;
  price: number;
  category: string;
};

export class ProductStore {
  //INDEX Operation
  async index(): Promise<Product[]> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM products';

      const result = await Client.query(sql);
      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get items from products ${err}`);
    }
  }

  //CREATE Operation
  async create(p: Product): Promise<Product[]> {
    const conn = await Client.connect();
    const sql =
      'INSERT INTO products(name, price, category) VALUES ($1,$2,$3) RETURNING *';

    const result = await conn.query(sql, [p.name, p.price, p.category]);
    conn.release();

    return result.rows[0];
  }

  //SHOW Operation
  async show(id: string): Promise<Product[]> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM products WHERE id=($1)';

      const result = await Client.query(sql, [id]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot get product ${id}. ${err}`);
    }
  }

  //PRODUCT BY CATEGORY Operation
  async productsByCategory(category: string): Promise<Product[]> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM products WHERE category = $1';

      const result = await conn.query(sql, [category]);
      conn.release();

      return result.rows;
    } catch (error) {
      throw new Error(`Error from products by category method ${error}`);
    }
  }

  async destory(product_id: string): Promise<void> {
    try {
      const conn = await Client.connect();
      const sql = 'DELETE FROM products WHERE id=$1';

      const result = await Client.query(sql, [product_id]);
      conn.release();

      return;
    } catch (error) {
      throw new Error(`Could Not Delete. ${error}`);
    }
  }
  //UPDATE Operation
  async update(p: Product): Promise<Product[]> {
    try {
      const { name, price, category, id } = p;
      const conn = await Client.connect();
      const sql =
        'UPDATE product SET name=$1, price = $2, category = $3 WHERE id = $4';

      const result = await conn.query(sql, [name, price, category, id]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot update product ${p.name}. ${err} `);
    }
  }
}
