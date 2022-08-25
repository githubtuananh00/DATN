"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization');
    const accessToken = authHeader && authHeader.split(' ')[1];
    if (!accessToken)
        return res
            .status(401)
            .json({ success: false, message: 'Access token not found' });
    try {
        const decoded = (0, jsonwebtoken_1.verify)(accessToken, process.env.ACCESS_TOKEN);
        req.userId = decoded._id;
        req.userRole = decoded.role;
        next();
    }
    catch (error) {
        return res
            .status(403)
            .json({ success: false, message: 'Invalid token' });
    }
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=verifyToken.js.map