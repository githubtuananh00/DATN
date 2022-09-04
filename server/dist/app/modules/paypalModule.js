"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const paypalSchema = new mongoose_1.Schema({
    paymentID: {
        type: String,
        required: true,
    },
    user_id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    address: {
        type: Object,
        required: true,
    },
    cart: [
        {
            type: Array,
            default: [],
        },
    ],
    status: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
exports.default = (0, mongoose_1.model)('PayPals', paypalSchema);
//# sourceMappingURL=paypalModule.js.map