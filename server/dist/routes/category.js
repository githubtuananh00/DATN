"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authAdmin_1 = require("../app/middleware/authAdmin");
const verifyToken_1 = require("../app/middleware/verifyToken");
const router = (0, express_1.Router)();
const categoryController_1 = __importDefault(require("../app/controllers/categoryController"));
router.post('/createCategory', verifyToken_1.verifyToken, authAdmin_1.authAdmin, categoryController_1.default.createCategory);
router.delete('/:id/delete', verifyToken_1.verifyToken, authAdmin_1.authAdmin, categoryController_1.default.deleteCategory);
router.put('/:id/update', verifyToken_1.verifyToken, authAdmin_1.authAdmin, categoryController_1.default.updateCategory);
router.get('/', categoryController_1.default.getCategories);
exports.default = router;
//# sourceMappingURL=category.js.map