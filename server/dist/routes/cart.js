"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verifyToken_1 = require("../app/middleware/verifyToken");
const router = (0, express_1.Router)();
const cartController_1 = __importDefault(require("../app/controllers/cartController"));
router.patch('/addCart', verifyToken_1.verifyToken, cartController_1.default.addCart);
router.put('/:id/update', verifyToken_1.verifyToken, cartController_1.default.updateCart);
router.delete('/:id/delete', verifyToken_1.verifyToken, cartController_1.default.deleteCart);
router.get('/', verifyToken_1.verifyToken, cartController_1.default.getCarts);
exports.default = router;
//# sourceMappingURL=cart.js.map