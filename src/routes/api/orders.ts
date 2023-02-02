import express from 'express';
import { OrderHandler } from '../../handlers/order';
import verifyAuthToken from '../../middlewares/verifyAuthToken';

const orderMethods = new OrderHandler();

const orders = express.Router();

orders.get('/', orderMethods.index);
orders.get('/:id', orderMethods.show);
orders.get('/complete/:id', verifyAuthToken, orderMethods.completedOrder);
orders.get('/active/:id', verifyAuthToken, orderMethods.currentOrder);
orders.post('/', orderMethods.create);

export default orders;
