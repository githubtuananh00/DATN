"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const paypalModule_1 = __importDefault(require("../modules/paypalModule"));
const ProductModule_1 = __importDefault(require("../modules/ProductModule"));
const User_1 = __importDefault(require("../modules/User"));
class PayPalController {
    getPayments(req, res) {
        req.off;
        paypalModule_1.default.find({})
            .then((payments) => res.status(200).json({
            success: true,
            message: process.env.MSG_GET_ALL_PAYPAL,
            payload: payments,
        }))
            .catch((err) => res.status(500).json({ success: false, err: err.message }));
    }
    async createPayment(req, res) {
        try {
            const user = await User_1.default.findById(req.userId).select('name email');
            if (!user)
                return res.status(400).json({
                    success: false,
                    message: process.env.MSG_USER_NOT_FOUND,
                });
            const { _id, name, email } = user;
            const newPayment = new paypalModule_1.default(Object.assign(Object.assign({}, req.body), { user_id: _id, name,
                email }));
            const { cart } = req.body;
            const cartPayment = cart;
            cartPayment.map((item) => updateSoldProduct(item.product._id, item.quantity, item.product.sold));
            await newPayment.save();
            return res.status(200).json({
                success: true,
                message: process.env.MSG_CREATE_PAYMENT_SUCCESS,
                payload: newPayment,
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: process.env.MSG_INTERNAL_SERVER_ERROR,
            });
        }
    }
    history(req, res) {
        paypalModule_1.default.find({ user_id: req.userId })
            .then((payments) => res.status(200).json({
            success: true,
            message: process.env.MSG_GET_PAYMENT_HISTORY_SUCCESS,
            payload: payments,
        }))
            .catch((err) => res.status(500).json({ success: false, err: err.message }));
    }
}
const updateSoldProduct = async (id, quantity, oldSold) => {
    await ProductModule_1.default.findOneAndUpdate({ _id: id }, {
        sold: quantity + oldSold,
    });
};
exports.default = new PayPalController();
//# sourceMappingURL=payPalController.js.map