"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var verifyAuthToken_1 = __importDefault(require("../middlewares/verifyAuthToken"));
var product_1 = require("../model/product");
var store = new product_1.ProductStore();
var index = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, store.index()];
            case 1:
                result = _a.sent();
                res.status(200).json(result);
                return [2 /*return*/];
            case 2:
                err_1 = _a.sent();
                throw new Error("Cannot get index ".concat(err_1));
            case 3: return [2 /*return*/];
        }
    });
}); };
var create = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name_1, price, category, result, err_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = _req.body, name_1 = _a.name, price = _a.price, category = _a.category;
                return [4 /*yield*/, store.create({ name: name_1, price: price, category: category })];
            case 1:
                result = _b.sent();
                res.status(201).json(result);
                return [2 /*return*/];
            case 2:
                err_2 = _b.sent();
                throw new Error("Cannot create product ".concat(_req.body.name, ". ").concat(err_2));
            case 3: return [2 /*return*/];
        }
    });
}); };
var show = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, store.show(String(_req.params.id))];
            case 1:
                result = _a.sent();
                res.status(200).json(result);
                return [2 /*return*/];
            case 2:
                error_1 = _a.sent();
                throw new Error("Cannot get product ".concat(_req.params.id, " ").concat(error_1));
            case 3: return [2 /*return*/];
        }
    });
}); };
var productsByCategory = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var category, result, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                category = _req.params.category;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, store.productsByCategory(category)];
            case 2:
                result = _a.sent();
                res.status(200).json(result);
                return [2 /*return*/];
            case 3:
                error_2 = _a.sent();
                throw new Error("Error from Products by Category handler ".concat(error_2));
            case 4: return [2 /*return*/];
        }
    });
}); };
var products_routes = function (app) {
    try {
        app.get('/products', index);
        app.post('/products', verifyAuthToken_1["default"], create);
        app.get('/products/:id', show);
        app.get('/products/:category', productsByCategory);
    }
    catch (err) {
        throw new Error("Cannot parse routes. ".concat(err));
    }
};
exports["default"] = products_routes;
