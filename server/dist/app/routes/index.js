"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = __importDefault(require("./auth"));
const routes = (app) => {
    app.use('/auth', auth_1.default);
};
exports.default = routes;
//# sourceMappingURL=index.js.map