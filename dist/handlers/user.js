"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserHandler = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const user_1 = require("../model/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const { TOKEN_SECRET } = process.env;
const store = new user_1.UserStore();
class UserHandler {
    async index(_req, res) {
        try {
            const users = await store.index();
            res.status(200).json(users);
        }
        catch (error) {
            throw new Error(`Cannot get users in handler ${error}`);
        }
    }
    async create(_req, res) {
        const user = {
            firstname: _req.body.firstname,
            lastname: _req.body.lastname,
            password: _req.body.password,
        };
        try {
            const newUser = await store.create(user);
            let token = jsonwebtoken_1.default.sign({ user: newUser }, String(TOKEN_SECRET));
            res.status(200).json(token);
        }
        catch (err) {
            res.status(400);
            res.json(String(err) + user);
        }
    }
    async show(_req, res) {
        try {
            const id = _req.params.id;
            const result = await store.show(id);
            res.status(200).json(result);
        }
        catch (error) {
            throw new Error(`Cannot get user in handler ${error}`);
        }
    }
}
exports.UserHandler = UserHandler;
// const authenticate = async (_req: Request, res: Response) => {
//   const {firstname, password} = _req.body
//   const result = await store.authenticate(firstname, password);
//   res.status(201).json(result);
// }
// const users_routes = async (app: Application) => {
//   try {
//     app.get('/users', verifyAuthToken, index);
//     app.post('/users', verifyAuthToken,create);
//     // app.post('/users/authenticate', authenticate);
//   } catch (err) {
//     throw new Error(`Could not parse user routes ${err}`);
//   }
// };
// export default users_routes;
