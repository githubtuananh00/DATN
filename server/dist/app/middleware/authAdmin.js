"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authAdmin = void 0;
const authAdmin = (req, res, next) => {
    if (!req.userRole)
        return res.status(401).json({
            success: false,
            message: 'Admin resources access denied',
        });
    next();
};
exports.authAdmin = authAdmin;
//# sourceMappingURL=authAdmin.js.map