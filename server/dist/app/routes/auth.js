"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    res.send('Hello Tuan Anh');
    req.off;
});
exports.default = router;
//# sourceMappingURL=auth.js.map