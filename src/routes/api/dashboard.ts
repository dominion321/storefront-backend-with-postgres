import express from "express";
import { DashboardHandlers } from "../../handlers/dashboard";

const dashboard = express.Router();
const dashboardMethods = new DashboardHandlers();

dashboard.get('/', dashboardMethods.productsInOrder);

export default dashboard;