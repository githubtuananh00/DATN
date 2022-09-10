"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const categorySchema = new mongoose_1.Schema({
    nameCategory: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
}, {
    timestamps: true,
});
exports.default = (0, mongoose_1.model)('Categories', categorySchema);
//# sourceMappingURL=CategoryModule.js.map