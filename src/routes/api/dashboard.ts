import express from "express";
import { DashboardHandlers } from "../../handlers/dashboard";

const dashboard = express.Router();
const dashboardMethods = new DashboardHandlers();

dashboard.get('/products_in_order', dashboardMethods.productsInOrder);

export default dashboard;