import supertest from 'supertest';
import app from '../../server';
import { Product, ProductStore } from '../product';

const request = supertest(app);
const store = new ProductStore();

const product: Product = {
  name: 'test',
  price: 300,
  category: 'test',
};

const category = 'food';

describe('Product Model', () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should successfully create a product', () => {
    expect(store.create(product)).toBeDefined();
  });

  it('should successfully show a product', () => {
    expect(store.show('1')).toBeDefined();
  });
  it('should successfully show products by given category', () => {
    expect(store.productsByCategory(category)).toBeDefined();
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

  it('should successfully create a product by endpoint', async () => {
    const response = await request.post('/products').send({ product });
    expect(response.status).toBe(200);
  });
  it('should successfully show products by given category by endpoint', async () => {
    const response = await request.get(`/api/products/${category}`);
    expect(response.status).toBe(200);
  });
});
