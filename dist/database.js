"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var pg_1 = require("pg");
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1["default"].config();
var _a = process.env, POSTGRES_DB = _a.POSTGRES_DB, POSTGRES_TEST_DB = _a.POSTGRES_TEST_DB, POSTGRES_USER = _a.POSTGRES_USER, POSTGRES_PASSWORD = _a.POSTGRES_PASSWORD, POSTGRES_HOST = _a.POSTGRES_HOST, ENV = _a.ENV;
console.log(ENV);
var db = '';
if (ENV === 'test') {
    db = POSTGRES_TEST_DB;
}
if (ENV === 'dev') {
    db = POSTGRES_DB;
}
var client = new pg_1.Pool({
    host: POSTGRES_HOST,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    database: db
});
exports["default"] = client;
