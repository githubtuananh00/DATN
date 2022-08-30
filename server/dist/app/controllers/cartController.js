"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CartModule_1 = __importDefault(require("../modules/CartModule"));
const ProductModule_1 = __importDefault(require("../modules/ProductModule"));
class CartController {
    getCarts(req, res) {
        req.off;
        CartModule_1.default.find({})
            .then((cart) => res.status(200).json({
            success: true,
            cart,
        }))
            .catch((err) => res.status(500).json({ success: false, err: err.message }));
    }
    async addCart(req, res) {
        const { product_id, quantity } = req.body;
        try {
            const product = await ProductModule_1.default.find({
                product_id,
            });
            if (product.length === 0)
                return res
                    .status(400)
                    .json({ success: false, message: 'Product not found' });
            const newCart = new CartModule_1.default({
                product_id,
                quantity,
            });
            await newCart.save();
            return res
                .status(200)
                .json({ success: true, message: 'added to cart successfully' });
        }
        catch (error) {
            console.log(error);
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