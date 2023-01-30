import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const {
  POSTGRES_DB,
  POSTGRES_TEST_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_HOST,
  ENV,
} = process.env;

console.log(ENV);
var db: string = '';
ENV === 'test'
  ? (db = POSTGRES_TEST_DB as string)
  : ENV === 'dev'
  ? (db = POSTGRES_DB as string)
  : '';

const client = new Pool({
  host: POSTGRES_HOST,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: db,
});

export default client;
