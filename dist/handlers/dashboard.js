"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardHandlers = void 0;
const dashboard_1 = require("../services/dashboard");
const dashboard = new dashboard_1.DashboardQueries();
class DashboardHandlers {
    async productsInOrder(_req, res) {
        try {
            const result = await dashboard.productsInOrder();
            res.status(200).json(result);
        }
        catch (error) {
            throw new Error(`Error from Dashboard Handler ${error}`);
        }
    }
}
exports.DashboardHandlers = DashboardHandlers;
