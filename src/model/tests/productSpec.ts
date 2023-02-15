import supertest from 'supertest';
import app from '../../server';
import { Product, ProductStore } from '../product';
import dotenv from 'dotenv';

dotenv.config();

const request = supertest(app);
const store = new ProductStore();

const product: Product = {
  name: 'test',
  price: 300,
  category: 'food',
};

let productId: string;

const category = 'food';

describe('Product Model', () => {
  it('should successfully create a product', async () => {
    const newProd = await store.create(product);
    const { id } = newProd;
    productId = id as string;
    expect(newProd.id).toBe(productId);
  });

  it('should have an index method', async () => {
    const index = await store.index();
    expect(index.length).toBeGreaterThan(0);
  });

  it('should successfully show a product', async () => {
    const show = await store.show(productId);
    expect(show.id).toBe(productId);
  });
  it('should successfully show products by given category', () => {
    expect(store.productsByCategory(category)).toBeDefined();
  });

  it('should successfully delete a product', async () => {
    const destroy = await store.destroy(productId);
    expect(destroy).toBe(true);
  });
});

describe('Product Endpoints', () => {
  it('should have an index method by endpoint', async () => {
    const response = await request.get('/api/products');
    expect(response.status).toBe(200);
  });

  it('should successfully show a product by endpoint', async () => {
    const response = await request.get('/api/products/1');
    expect(response.status).toBe(200);
  });

  it('should deny access when creating a product by endpoint', async () => {
    const response = await request.post('/api/products').send(product);
    expect(response.status).toBe(401);
  });

  it('should successfully show products by given category by endpoint', async () => {
    await request.post(`/api/products`).send(product);
    const response = await request.get(`/api/products/category/${category}`);
    expect(response.status).toBe(200);
  });

  it('should throw access denied when trying to delete products by endpoint', async () => {
    await request.post(`/api/products`).send(product);
    const response = await request.delete(`/api/products/2000`);
    expect(response.status).toBe(401);
  });
});
