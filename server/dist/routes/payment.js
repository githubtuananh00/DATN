"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verifyToken_1 = require("../app/middleware/verifyToken");
const authAdmin_1 = require("../app/middleware/authAdmin");
const payPalController_1 = __importDefault(require("../app/controllers/payPalController"));
const router = (0, express_1.Router)();
router.post('/createPayment', verifyToken_1.verifyToken, payPalController_1.default.createPayment);
router.get('/history', verifyToken_1.verifyToken, payPalController_1.default.history);
router.get('/', verifyToken_1.verifyToken, authAdmin_1.authAdmin, payPalController_1.default.getPayments);
exports.default = router;
//# sourceMappingURL=payment.js.map