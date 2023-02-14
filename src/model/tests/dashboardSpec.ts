import supertest from 'supertest';
import app from '../../server';
import { DashboardQueries } from '../../services/dashboard';

const store = new DashboardQueries();

const request = supertest(app);

describe('Dashboard Service Model', () => {
  it('should have a products in order model', async () => {
    expect(store.productsInOrder).toBeDefined();
  });
});

describe('Dashboard Service Endpoint', () => {
  it('should have a products in order endpoint', async () => {
    const response = await request.get('/api/dashboard/products_in_order');
    expect(response.status).toBe(200);
  });
});
