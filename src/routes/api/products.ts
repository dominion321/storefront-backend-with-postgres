import express from 'express';
import { ProductHandler } from '../../handlers/product';
import verifyAuthToken from '../../middlewares/verifyAuthToken';
const productMethods = new ProductHandler();

const products = express.Router();

products.get('/', productMethods.index);
products.get('/:id', productMethods.show);
products.get('/category/:category', productMethods.productsByCategory);
products.post('/', verifyAuthToken, productMethods.create);
products.delete('/:product_id', verifyAuthToken, productMethods.destroy);

export default products;
