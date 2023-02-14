import { Order, OrderStore } from '../order';
import { User, UserStore } from '../user';
import supertest from 'supertest';
import app from '../../server';
import client from '../../database';

const store = new OrderStore();
const userStore = new UserStore();
const request = supertest(app);

let stat: string = 'active';

const newOrder: Order = {
  status: stat,
  user_id: '1',
};

const addedProductOrder = {
  quantity: 1,
  productId: 1,
  orderId: 1,
};

const product = {
  name: 'test',
  price: 10,
  category: 'food',
};

let id: string;
const { name, price, category } = product;

beforeAll(async () => {
  try {
    const conn = await client.connect();
    const sql =
      'INSERT INTO products (name, price, category) VALUES($1,$2,$3) RETURNING *';
    const result = await conn.query(sql, [name, price, category]);
    conn.release();
    id = result.rows[0]['id'];
  } catch (err) {
    throw new Error(`${err} from orderSpec`);
  }
});

beforeAll(async () => {
  const newUser: User = {
    firstname: 'lol',
    lastname: 'namama',
    password: 'chai',
  };
  const user = await userStore.create(newUser);
  const user_id = user.id;
});

describe('Order Model', () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.create(newOrder)).toBeDefined();
  });

  it('should have a completed order method', () => {
    expect(store.completedOrder).toBeDefined();
  });

  it('should have a current order method', () => {
    expect(store.currentOrder).toBeDefined();
  });
  it('should  have an add product to an order method', () => {
    expect(store.addProducts).toBeDefined();
  });
});

describe('Order Endpoints', () => {
  it('should deny access to the create method by endpoint', async () => {
    const response = await request.post('/api/orders').send(newOrder);
    expect(response.status).toBe(401);
  });
  it('should deny access to the index method by endpoint', async () => {
    const response = await request.get('/api/orders');
    expect(response.status).toBe(401);
  });

  it('should deny access to the show method by endpoint', async () => {
    const response = await request.get('/api/orders/1');
    expect(response.status).toBe(401);
  });
  it('should deny access to the completed method by endpoint', async () => {
    const response = await request.get('/api/orders/complete/1');
    expect(response.status).toBe(401);
  });
  it('should deny access to the active method by endpoint', async () => {
    const response = await request.get('/api/orders/active/2');
    expect(response.status).toBe(401);
  });
  it('should deny access to the add a product to an order by endpoint', async () => {
    const response = await request
      .post(`/api/orders/${id}/products`)
      .send(addedProductOrder);
    expect(response.status).toBe(401);
  });
});
