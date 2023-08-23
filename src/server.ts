import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './routes';

const app: express.Application = express();
const address: string = '0.0.0.0:3000';
const PORT = process.env.PORT || 3000
const corsOptions = {
  origin: `http://localhost:${PORT}`,
  optionSuccessStatus: 200,
};

app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use('/api', routes);

app.listen(PORT, function () {
  console.log(`starting app on: ${address}`);
});

export default app;
