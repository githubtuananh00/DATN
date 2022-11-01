"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CartModule_1 = __importDefault(require("../modules/CartModule"));
const User_1 = __importDefault(require("../modules/User"));
class CartController {
    getCarts(req, res) {
        req.off;
        User_1.default.findById(req.userId)
            .then((user) => res.status(200).json({
            success: true,
            payload: user.cart,
            message: 'Get all cart successfully',
        }))
            .catch((err) => res.status(500).json({ success: false, err: err.message }));
    }
    async addCart(req, res) {
        try {
            const user = await User_1.default.findById(req.userId);
            if (!req.body)
                return res
                    .status(400)
                    .json({ success: false, message: 'Product not found' });
            if (!user) {
                return res.status(400).json({
                    success: false,
                    message: 'Please login before purchasing',
                });
            }
            await user.updateOne({
                cart: req.body,
            });
            return res
                .status(200)
                .json({ success: true, message: 'added to cart successfully' });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Internal Server Error',
            });
        }
    }
    updateCart(req, res) {
        CartModule_1.default.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.json({
            success: true,
            message: 'Update a Cart successfully',
        }))
            .catch((err) => res.status(500).json({ success: false, message: err.message }));
    }
    deleteCart(req, res) {
        CartModule_1.default.deleteOne({ _id: req.params.id })
            .then(() => res.json({
            success: true,
            message: 'Delete a Cart successfully',
        }))
            .catch((err) => res.status(500).json({ success: false, message: err.message }));
    }
}
exports.default = new CartController();
//# sourceMappingURL=cartController.js.map