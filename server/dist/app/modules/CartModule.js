"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const cartSchema = new mongoose_1.Schema({
    product_id: [
        {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
    ],
    user_id: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    quantity: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
});
exports.default = (0, mongoose_1.model)('carts', cartSchema);
//# sourceMappingURL=CartModule.js.map