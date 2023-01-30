import express from 'express';
import { ProductHandler } from '../../handlers/product';
const productMethods = new ProductHandler();

const products = express.Router();

products.get('/index', productMethods.index);
products.get('/show/:id', productMethods.show);
products.get('/category/:category', productMethods.productsByCategory);
products.post('/create', productMethods.create);

export default products;
