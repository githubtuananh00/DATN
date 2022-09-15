"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../modules/User"));
const argon2_1 = require("argon2");
const jsonwebtoken_1 = __importStar(require("jsonwebtoken"));
class AuthController {
    async loadUser(req, res) {
        try {
            const user = await User_1.default.findById(req.userId).select('-password');
            if (!user)
                return res
                    .status(400)
                    .json({ success: false, message: 'User not found' });
            return res.json({ success: true, payload: user });
        }
        catch (error) {
            return res
                .status(500)
                .json({ success: false, message: error.message });
        }
    }
    async register(req, res) {
        const { username, password, name, email, phone, address, gt, dateOfBirth, role, } = req.body;
        if (!username || !password)
            return res.status(400).json({
                success: false,
                message: 'Mission username or password',
            });
        try {
            const user = await User_1.default.findOne({ username });
            if (user)
                return res
                    .status(400)
                    .json({ success: false, message: 'User already exists' });
            const phone1 = await User_1.default.findOne({ phone });
            if (phone1)
                return res.status(400).json({
                    success: false,
                    message: 'Phone number already exists',
                });
            const email1 = await User_1.default.findOne({ email });
            if (email1)
                return res.status(400).json({
                    success: false,
                    message: 'Email already exists',
                });
            const hashPassword = await (0, argon2_1.hash)(password);
            const newUser = new User_1.default({
                username,
                password: hashPassword,
                name,
                email,
                phone,
                address,
                gt,
                dateOfBirth,
                role,
            });
            await newUser.save();
            return res.status(200).json({
                success: true,
                message: 'User created successfully',
            });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: 'Internal Server Error',
            });
        }
    }
    async login(req, res) {
        const { username, password } = req.body;
        if (!username || !password)
            return res.status(400).json({
                success: false,
                message: 'Mission username or password',
                tokens: null,
            });
        try {
            const user = await User_1.default.findOne({ username });
            if (!user)
                return res.status(400).json({
                    success: false,
                    message: 'Incorrect username or password',
                    tokens: null,
                });
            const passwordValid = await (0, argon2_1.verify)(user.password, password);
            if (!passwordValid)
                return res.status(400).json({
                    success: false,
                    message: 'Incorrect username or password',
                    tokens: null,
                });
            const tokens = generateTokens(user);
            await User_1.default.updateOne({ _id: user._id }, { refreshToken: tokens.refreshToken });
            return res.status(200).json({
                success: true,
                message: 'User logged in successfully',
                tokens,
            });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: 'Internal Server Error',
                tokens: null,
            });
        }
    }
    async token(req, res) {
        const userId = req.userId;
        try {
            const user = await User_1.default.findOne({ _id: userId });
            if (!user)
                return res
                    .status(403)
                    .json({ success: false, message: 'refreshToken not found' });
            const refreshToken = user.refreshToken;
            jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN);
            const tokens = generateTokens(user);
            await User_1.default.updateOne({ _id: user._id }, { refreshToken: tokens.refreshToken });
            return res.status(200).json({
                success: true,
                message: 'Refresh Token successfully',
                tokens,
            });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: 'Internal Server Error',
            });
        }
    }
    async deleteToken(req, res) {
        const userId = req.userId;
        try {
            await User_1.default.updateOne({ _id: userId }, { refreshToken: null });
            return res.status(204).json({
                success: true,
                message: 'Logout Successfully',
            });
        }
        catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: 'Internal Server Error' });
        }
    }
    test(req, res, next) {
        res.send(req.userId);
        next();
    }
}
const generateTokens = (payload) => {
    const { _id, role } = payload;
    const accessToken = (0, jsonwebtoken_1.sign)({ _id, role }, process.env.ACCESS_TOKEN, { expiresIn: '10m' });
    const refreshToken = (0, jsonwebtoken_1.sign)({ _id, role }, process.env.REFRESH_TOKEN, { expiresIn: '1h' });
    return { accessToken, refreshToken };
};
exports.default = new AuthController();
//# sourceMappingURL=authController.js.map