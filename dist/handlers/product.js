"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductHandler = void 0;
const product_1 = require("../model/product");
const store = new product_1.ProductStore();
class ProductHandler {
    async index(_req, res) {
        try {
            const result = await store.index();
            res.status(200).json(result);
        }
        catch (err) {
            throw new Error(`Cannot get index ${err}`);
        }
    }
    async create(_req, res) {
        try {
            const { name, price, category } = _req.body;
            const result = await store.create({ name, price, category });
            res.status(201).json(result);
        }
        catch (err) {
            throw new Error(`Cannot create product ${_req.body.name}. ${err}`);
        }
    }
    async show(_req, res) {
        try {
            const result = await store.show(String(_req.params.id));
            res.status(200).json(result);
        }
        catch (error) {
            throw new Error(`Cannot get product ${_req.params.id} ${error}`);
        }
    }
    async productsByCategory(_req, res) {
        const category = _req.params.category;
        try {
            const result = await store.productsByCategory(category);
            res.status(200).json(result);
        }
        catch (error) {
            throw new Error(`Error from Products by Category handler ${error}`);
        }
    }
    async destroy(_req, res) {
        const product_id = _req.params.product_id;
        try {
            const deleted = await store.destory(product_id);
            res.status(200).json(`Delete successful`);
        }
        catch (error) {
            throw new Error(`Error in deletion ${error}`);
        }
    }
}
exports.ProductHandler = ProductHandler;
// const products_routes = (app: Application) => {
//   try {
//     app.get('/products', index);
//     app.post('/products', verifyAuthToken, create);
//     app.get('/products/:id', show);
//     app.get('/products/:category', productsByCategory);
//   } catch (err) {
//     throw new Error(`Cannot parse routes. ${err}`);
//   }
// };
