"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authAdmin_1 = require("../app/middleware/authAdmin");
const verifyToken_1 = require("../app/middleware/verifyToken");
const productController_1 = __importDefault(require("../app/controllers/productController"));
const router = (0, express_1.Router)();
router.post('/createProduct', verifyToken_1.verifyToken, authAdmin_1.authAdmin, productController_1.default.createProduct);
router.delete('/:id/delete', verifyToken_1.verifyToken, authAdmin_1.authAdmin, productController_1.default.deleteProduct);
router.put('/:id/update', verifyToken_1.verifyToken, authAdmin_1.authAdmin, productController_1.default.updateProduct);
router.get('/detail/:id', productController_1.default.getProductId);
router.get('/', productController_1.default.getProducts);
exports.default = router;
//# sourceMappingURL=product.js.map