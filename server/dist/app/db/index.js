"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connectDb = () => {
    mongoose_1.default
        .connect(`mongodb://localhost:27017/shopbanhang`)
        .then(() => console.log('Connect successful!'))
        .catch(() => console.log('Connect failed'));
};
exports.default = connectDb;
//# sourceMappingURL=index.js.map