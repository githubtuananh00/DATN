"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = __importDefault(require("./auth"));
const category_1 = __importDefault(require("./category"));
const product_1 = __importDefault(require("./product"));
const cart_1 = __importDefault(require("./cart"));
const payment_1 = __importDefault(require("./payment"));
const upload_1 = __importDefault(require("./upload"));
const routes = (app) => {
    app.use('/auth', auth_1.default);
    app.use('/category', category_1.default);
    app.use('/product', product_1.default);
    app.use('/cart', cart_1.default);
    app.use('/payment', payment_1.default);
    app.use('/', upload_1.default);
};
exports.default = routes;
//# sourceMappingURL=index.js.map