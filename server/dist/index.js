"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const cors_1 = __importDefault(require("cors"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const cloudinary_1 = __importDefault(require("cloudinary"));
const db_1 = __importDefault(require("./app/db"));
require('dotenv').config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: process.env.URL_BACKEND,
    credentials: true,
    optionsSuccessStatus: 200,
}));
cloudinary_1.default.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});
app.use((0, express_fileupload_1.default)());
const PORT = process.env.PORT || 5000;
(0, routes_1.default)(app);
(0, db_1.default)();
app.listen(PORT, () => {
    return console.log(`${process.env.MSG_LISTEN}${PORT}`);
});
//# sourceMappingURL=index.js.map