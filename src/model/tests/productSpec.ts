import { Product, ProductStore } from '../product';

// const request = supertest(app);
const store = new ProductStore();
const product: Product = {
  name: 'test',
  price: 300,
  category: 'test',
};

describe('Product Model', () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should successfully create a product', () => {
    expect(store.create(product)).toBeDefined();
  });

});
