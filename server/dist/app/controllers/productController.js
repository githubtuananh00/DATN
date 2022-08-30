"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ProductModule_1 = __importDefault(require("../modules/ProductModule"));
class APIfeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }
    filtering() {
        const queryObj = Object.assign({}, this.queryString);
        const excludedFields = ['page', 'sort', 'limit'];
        excludedFields.forEach((el) => delete queryObj[el]);
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, (match) => '$' + match);
        this.query.find(JSON.parse(queryStr));
        return this;
    }
    sorting() {
        return this;
    }
    paginating() {
        return this;
    }
}
class ProductController {
    async getProducts(req, res) {
        try {
            const features = new APIfeatures(await ProductModule_1.default.find({}), req.query);
            const products = features.query;
            return res.status(200).json({ success: true, products });
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
            return res.status(200).json({ success: true, product });
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