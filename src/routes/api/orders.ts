import express from 'express';
import { OrderHandler } from '../../handlers/order';

const orderMethods = new OrderHandler();

const orders = express.Router();

orders.get('/', orderMethods.index);
orders.get('/:id', orderMethods.show);
orders.get('/completed/:id', orderMethods.completedOrder);
orders.get('/active/:id', orderMethods.currentOrder);
orders.post('/', orderMethods.create);

export default orders;
