import express from 'express';
import { ProductHandler } from '../../handlers/product';
const productMethods = new ProductHandler();

const products = express.Router();

products.get('/', productMethods.index);
products.get('/:id', productMethods.show);
products.get('/category/:category', productMethods.productsByCategory);
products.post('/', productMethods.create);

export default products;
