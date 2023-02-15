import express from 'express';
import { OrderHandler } from '../../handlers/order';
import verifyAuthToken from '../../middlewares/verifyAuthToken';

const orderMethods = new OrderHandler();

const orders = express.Router();

orders.get('/', verifyAuthToken, orderMethods.index);
orders.get('/:id', verifyAuthToken, orderMethods.show);
orders.get('/complete/:id', verifyAuthToken, orderMethods.completedOrder);
orders.get('/active/:id', verifyAuthToken, orderMethods.currentOrder);
orders.post('/', verifyAuthToken, orderMethods.create);
orders.post('/:id/products', verifyAuthToken, orderMethods.addProduct);

export default orders;
