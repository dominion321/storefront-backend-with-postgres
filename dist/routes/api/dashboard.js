"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var dashboard_1 = require("../../handlers/dashboard");
var dashboard = express_1["default"].Router();
var dashboardMethods = new dashboard_1.DashboardHandlers();
dashboard.get('/', dashboardMethods.productsInOrder);
exports["default"] = dashboard;
