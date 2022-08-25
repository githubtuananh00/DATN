"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ProdIProductSchema = new mongoose_1.Schema({
    product_id: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    content: {
        type: String,
        required: true,
        trim: true,
    },
    category: {
        type: String,
        required: true,
        trim: true,
    },
    checked: {
        type: Boolean,
        default: false,
    },
    sold: {
        type: Number,
        default: 0,
    },
    image: {
        type: Object,
        required: true,
    },
}, {
    timestamps: true,
});
exports.default = (0, mongoose_1.model)('products', ProdIProductSchema);
//# sourceMappingURL=ProductModule.js.map