"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ProductModule_1 = __importDefault(require("../modules/ProductModule"));
class ProductController {
    async getProducts(req, res) {
        try {
            const queryObj = Object.assign({}, req.query);
            const excludedFields = ['page', 'sort', 'limit'];
            excludedFields.forEach((el) => delete queryObj[el]);
            let queryStr = JSON.stringify(queryObj);
            queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, (match) => '$' + match);
            let products = [];
            const page = parseInt(req.query.page) * 1 || 1;
            const limit = parseInt(req.query.limit) * 1 || 9;
            const skip = (page - 1) * limit;
            if (req.query.sort) {
                const sortBy = req.query.sort.split(',').join(' ');
                products = await ProductModule_1.default.find(JSON.parse(queryStr))
                    .sort(sortBy)
                    .skip(skip)
                    .limit(limit);
            }
            else {
                products = await ProductModule_1.default.find(JSON.parse(queryStr))
                    .sort('-createdAt')
                    .skip(skip)
                    .limit(limit);
            }
            return res.status(200).json({
                success: true,
                payload: { result: products.length, products },
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: process.env.MSG_INTERNAL_SERVER_ERROR,
            });
        }
    }
    async getProductId(req, res) {
        try {
            const product = await ProductModule_1.default.findOne({
                _id: req.params.id,
            });
            return res.status(200).json({ success: true, payload: product });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: process.env.MSG_INTERNAL_SERVER_ERROR,
            });
        }
    }
    async createProduct(req, res) {
        const { product_id, title, price, description, content, image, category, } = req.body;
        if (!image)
            return res.status(400).json({
                success: false,
                message: process.env.MSG_NO_IMG_UPLOAD,
            });
        try {
            const product = await ProductModule_1.default.findOne({
                product_id,
            });
            if (product)
                return res.status(400).json({
                    success: false,
                    message: process.env.MSG_PRODUCT_EXISTS,
                });
            const newProduct = new ProductModule_1.default({
                product_id,
                title: title.toLowerCase(),
                price,
                description,
                content,
                image,
                category,
            });
            await newProduct.save();
            return res.status(200).json({
                success: true,
                message: process.env.MSG_CREATE_PRODUCT_SUCCESS,
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: process.env.MSG_INTERNAL_SERVER_ERROR,
            });
        }
    }
    deleteProduct(req, res) {
        ProductModule_1.default.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({
            success: true,
            message: process.env.MSG_DELETE_PRODUCT_SUCCESS,
        }))
            .catch((err) => res.status(500).json({ success: false, message: err.message }));
    }
    updateProduct(req, res) {
        const { image, title } = req.body;
        if (!image)
            return res.status(400).json({
                success: false,
                message: process.env.MSG_NO_IMG_UPLOAD,
            });
        ProductModule_1.default.updateOne({ _id: req.params.id }, Object.assign(Object.assign({}, req.body), { title: title.toLowerCase() }))
            .then(() => res.status(200).json({
            success: true,
            message: process.env.MSG_UPDATE_PRODUCT_SUCCESS,
        }))
            .catch((err) => res.status(500).json({ success: false, message: err.message }));
    }
}
exports.default = new ProductController();
//# sourceMappingURL=productController.js.map