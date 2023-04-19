import Client from '../database';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const saltRounds = process.env.SALT_ROUNDS!;
const pepper = process.env.BCRYPT_PASSWORD;

export type User = {
  id?: string;
  firstname: string;
  lastname: string;
  password: string;
};

export class UserStore {
  async index(): Promise<User[]> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM users';

      const result = await conn.query(sql);
      conn.release();

      return result.rows;
    } catch (error) {
      throw new Error(`Cannot get users ${error}`);
    }
  }

  async create(u: User): Promise<User> {
    try {
      const conn = await Client.connect();
      const sql =
        'INSERT INTO users (firstname, lastname, password_digest) VALUES ($1,$2,$3) RETURNING *';
      const hash = bcrypt.hashSync(u.password + pepper, parseInt(saltRounds));

      const result = await conn.query(sql, [u.firstname, u.lastname, hash]);
      const user = result.rows[0];

      conn.release();

      return user;
    } catch (err) {
      throw new Error(`Cannot create user ${u.firstname} ${err}`);
    }
  }

  async show(id: string): Promise<User> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM users WHERE id=($1)';

      const result = await conn.query(sql, [id]);
      conn.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`Cannot get user ${id}. ${error}`);
    }
  }

  // async authenticate(username: string, password: string): Promise<User | null> {
  //   const conn = await Client.connect();
  //   const sql = 'SELECT password_digest FROM users WHERE firstname=($1)';

  //   const result = await conn.query(sql, [username]);
  //   conn.release();

  //   if (result.rows.length) {
  //     const user = result.rows[0];
  //     console.log(user);

  //     if (
  //       bcrypt.compareSync(password + BCRYPT_PASSWORD, user.password_digest)
  //     ) {
  //       return user;
  //     }
  //   }
  //   return null;
  // }
}
