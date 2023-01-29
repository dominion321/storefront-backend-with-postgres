import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import products_routes from './handlers/product';
import users_routes from './handlers/user';
import orders_routes from './handlers/order';

const app: express.Application = express();
const address: string = '0.0.0.0:3000';

app.use(bodyParser.json());
app.use(cors());

app.get('/', function (_req: Request, res: Response) {
  res.send('Server Connected');
});

products_routes(app);
users_routes(app);
orders_routes(app);

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});
