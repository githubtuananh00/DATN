"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verifyToken_1 = require("../app/middleware/verifyToken");
const router = (0, express_1.Router)();
const authController_1 = __importDefault(require("../app/controllers/authController"));
router.post('/register', authController_1.default.register);
router.post('/login', authController_1.default.login);
router.get('/token', verifyToken_1.verifyToken, authController_1.default.token);
router.delete('/delete', verifyToken_1.verifyToken, authController_1.default.deleteToken);
router.get('/', verifyToken_1.verifyToken, authController_1.default.loadUser);
exports.default = router;
//# sourceMappingURL=auth.js.map