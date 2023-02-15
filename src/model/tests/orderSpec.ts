import { Order, OrderStore } from '../order';
import { User, UserStore } from '../user';
import supertest from 'supertest';
import app from '../../server';
import { Product, ProductStore } from '../product';

//Instances for the order, user and product objects
const orderStore = new OrderStore();
const userStore = new UserStore();
const productStore = new ProductStore();

//Instance for the supertest module
const request = supertest(app);

//Order object
const newOrder: Order = {
  status: 'active',
  user_id: '1',
};

//User object
const newUser: User = {
  firstname: 'test',
  lastname: 'test',
  password: 'testing',
};

//Object for use in the add product to order test
const addedProductOrder = {
  quantity: 1,
  orderId: '1',
};

//Destructured values from the addedProductOrder object
const { quantity, orderId } = addedProductOrder;

//Product object
const product: Product = {
  name: 'test',
  price: 1000,
  category: 'test',
};

//Initialized ids for user, order and product
let userId: string;
let id: string;
let productId: string;

//Creating a User first to aid tests
beforeAll(async () => {
  try {
    const user = await userStore.create(newUser);
    const { id } = user;
    userId = id as string;
  } catch (error) {
    throw new Error(`${error} from create user at orderspec`);
  }
});

//Creating a Product first to aid test
beforeAll(async () => {
  try {
    const newProd = await productStore.create(product);
    const { id } = newProd;
    const productId = id;
  } catch (error) {}
});

// <=========== ** THE TESTS ** ===========>
describe('Order Model', () => {
  it('should have an index method', async () => {
    //Create an order first before fetching order index
    await orderStore.create(newOrder);
    const result = await orderStore.index();
    expect(result.length).toBeGreaterThan(0);
  });

  it('should have a show method', async () => {
    const result = await orderStore.show(userId);
    expect(result.user_id).toBe(`${userId as string}`);
  });

  it('should have a create method', async () => {
    const result = await orderStore.create(newOrder);
    expect(result.status).toBe('active');
  });

  it('should have a completed order method', async () => {
    const order: Order = {
      status: 'complete',
      user_id: '1',
    };
    const result = await orderStore.create(order);
    expect(result.status).toBe('complete');
  });

  it('should have a current order method', async () => {
    const result = await orderStore.create(newOrder);
    expect(result.status).toBe('active');
  });

  it('should have an add product to an order method', async () => {
    const newOrderAdded = await orderStore.addProducts(
      quantity,
      orderId,
      productId
    );
    expect(newOrderAdded.id as unknown as number).toBe(1);
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
