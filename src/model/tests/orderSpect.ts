import { OrderStore } from '../order';

const store = new OrderStore();

describe('Order Model', () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.show).toBeDefined();
  });

  it('should have an create method', () => {
    expect(store.create).toBeDefined();
  });

  it('should have a completed order method', () => {
    expect(store.completedOrder).toBeDefined();
  });

  it('should have a current order method', () => {
    expect(store.currentOrder).toBeDefined();
  });
});
