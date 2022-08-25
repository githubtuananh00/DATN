"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authAdmin = void 0;
const role_1 = require("../resources/role");
const authAdmin = (req, res, next) => {
    if (req.userRole !== role_1.role.ADMIN)
        return res.status(401).json({
            success: false,
            message: 'Admin resources access denied',
        });
    next();
};
exports.authAdmin = authAdmin;
//# sourceMappingURL=authAdmin.js.map