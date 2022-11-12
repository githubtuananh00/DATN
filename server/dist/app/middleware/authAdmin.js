"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authAdmin = void 0;
const authAdmin = (req, res, next) => {
    if (!req.userRole)
        return res.status(401).json({
            success: false,
            message: process.env.MSG_HTTP_UNAUTHORIZED,
        });
    next();
};
exports.authAdmin = authAdmin;
//# sourceMappingURL=authAdmin.js.map