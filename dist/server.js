"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var routes_1 = __importDefault(require("./routes"));
var app = (0, express_1["default"])();
var address = '0.0.0.0:3000';
var corsOptions = {
    origin: 'http://localhost:3000',
    optionSuccessStatus: 200
};
app.use(body_parser_1["default"].json());
app.use((0, cors_1["default"])(corsOptions));
app.use('/api', routes_1["default"]);
app.listen(3000, function () {
    console.log("starting app on: ".concat(address));
});
