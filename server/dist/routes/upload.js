"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authAdmin_1 = require("../app/middleware/authAdmin");
const verifyToken_1 = require("../app/middleware/verifyToken");
const cloudinary_1 = __importDefault(require("cloudinary"));
const uploadController_1 = __importDefault(require("../app/controllers/uploadController"));
const router = (0, express_1.Router)();
cloudinary_1.default.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});
router.post('/upload', verifyToken_1.verifyToken, authAdmin_1.authAdmin, uploadController_1.default.uploadFile);
router.post('/delete', verifyToken_1.verifyToken, authAdmin_1.authAdmin, uploadController_1.default.deleteFile);
exports.default = router;
//# sourceMappingURL=upload.js.map