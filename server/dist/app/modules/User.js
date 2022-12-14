"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    address: {
        type: String,
        required: true,
        trim: true,
    },
    gt: {
        type: String,
        required: true,
        enum: ['Nam', 'Nữ', 'Khác'],
    },
    dateOfBirth: {
        type: String,
        required: true,
        trim: true,
        default: '01/01/1990',
    },
    role: {
        type: Boolean,
        required: true,
        default: false,
    },
    refreshToken: {
        type: String,
        required: false,
        default: null,
    },
    cart: [
        {
            type: Object,
            default: [],
        },
    ],
}, {
    timestamps: true,
});
exports.default = (0, mongoose_1.model)('users', userSchema);
//# sourceMappingURL=User.js.map