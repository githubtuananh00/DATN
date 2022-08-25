"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const cors_1 = __importDefault(require("cors"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
require('dotenv').config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200,
}));
app.use((0, express_fileupload_1.default)());
const PORT = process.env.PORT || 5000;
app.get('/', (req, res) => {
    res.send('Hello World!');
    req.off;
});
(0, routes_1.default)(app);
const db_1 = __importDefault(require("./app/db"));
(0, db_1.default)();
app.listen(PORT, () => {
    return console.log(`Express is listening at http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map