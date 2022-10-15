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
            const limit = parseInt(req.query.limit) * 1 || 3;
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
            return res
                .status(500)
                .json({ success: false, message: error.message });
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
            return res
                .status(500)
                .json({ success: false, message: error.message });
        }
    }
    async createProduct(req, res) {
        const { product_id, title, price, description, content, image, category, } = req.body;
        if (!image)
            return res
                .status(400)
                .json({ success: false, message: 'No image upload' });
        try {
            const product = await ProductModule_1.default.findOne({
                product_id,
            });
            if (product)
                return res.status(400).json({
                    success: false,
                    message: 'This product already exists',
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
            return res.json({
                success: true,
                message: 'Create a Product successfully',
            });
        }
        catch (error) {
            return res
                .status(500)
                .json({ success: false, message: error.message });
        }
    }
    deleteProduct(req, res) {
        ProductModule_1.default.deleteOne({ _id: req.params.id })
            .then(() => res.json({
            success: true,
            message: 'Delete a Product successfully',
        }))
            .catch((err) => res.status(500).json({ success: false, message: err.message }));
    }
    updateProduct(req, res) {
        const { image, title } = req.body;
        if (!image)
            return res
                .status(400)
                .json({ success: false, message: 'No image upload' });
        ProductModule_1.default.updateOne({ _id: req.params.id }, Object.assign(Object.assign({}, req.body), { title: title.toLowerCase() }))
            .then(() => res.json({
            success: true,
            message: 'Update a Product successfully',
        }))
            .catch((err) => res.status(500).json({ success: false, message: err.message }));
    }
}
exports.default = new ProductController();
//# sourceMappingURL=productController.js.map