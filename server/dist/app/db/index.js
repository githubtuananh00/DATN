"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connectDb = () => {
    mongoose_1.default
        .connect(process.env.PATH_CONFIG_DB)
        .then(() => console.log(process.env.MSG_DB_SUCCESS))
        .catch(() => console.log(process.env.MSG_BD_FAILED));
};
exports.default = connectDb;
//# sourceMappingURL=index.js.map