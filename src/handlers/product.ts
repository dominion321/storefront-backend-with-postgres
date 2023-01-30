import { Application, Request, Response } from 'express';
import { ProductStore, Product } from '../model/product';

const store = new ProductStore();

export class ProductHandler {
  async index(_req: Request, res: Response){
    try {
      const result = await store.index();
      res.status(200).json(result);
      return;
    } catch (err) {
      throw new Error(`Cannot get index ${err}`);
    }
  };

  async create(_req: Request, res: Response){
    try {
      const { name, price, category } = _req.body;
      const result = await store.create({ name, price, category });
      res.status(201).json(result);
      return;
    } catch (err) {
      throw new Error(`Cannot create product ${_req.body.name}. ${err}`);
    }
  };

  async show(_req: Request, res: Response){
    try {
      const result = await store.show(String(_req.params.id));
      res.status(200).json(result);
      return;
    } catch (error) {
      throw new Error(`Cannot get product ${_req.params.id} ${error}`);
    }
  };
  
  async productsByCategory(_req: Request, res: Response){
    const category = _req.params.category;
    try {
      const result = await store.productsByCategory(category);
      res.status(200).json(result);
      return;
    } catch (error) {
      throw new Error(`Error from Products by Category handler ${error}`);
    }
  };
}







// const products_routes = (app: Application) => {
//   try {
//     app.get('/products', index);
//     app.post('/products', verifyAuthToken, create);
//     app.get('/products/:id', show);
//     app.get('/products/:category', productsByCategory);
//   } catch (err) {
//     throw new Error(`Cannot parse routes. ${err}`);
//   }
// };

