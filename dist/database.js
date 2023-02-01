"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { POSTGRES_DB, POSTGRES_TEST_DB, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_HOST, ENV, } = process.env;
console.log(ENV);
var db = '';
ENV === 'test'
    ? (db = POSTGRES_TEST_DB)
    : ENV === 'dev'
        ? (db = POSTGRES_DB)
        : '';
const client = new pg_1.Pool({
    host: POSTGRES_HOST,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    database: db,
});
console.log(db);
exports.default = client;
