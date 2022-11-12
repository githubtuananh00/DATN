"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CategoryModule_1 = __importDefault(require("../modules/CategoryModule"));
class CategoryController {
    getCategories(req, res) {
        req.off;
        CategoryModule_1.default.find({})
            .then((category) => res.status(200).json({ success: true, payload: category }))
            .catch((err) => res.status(500).json({ success: false, err: err.message }));
    }
    getCategoryById(req, res) {
        CategoryModule_1.default.findById(req.params.id)
            .then((category) => res.status(200).json({
            success: true,
            payload: category,
        }))
            .catch((error) => res.status(500).json({ success: false, err: error.message }));
    }
    async createCategory(req, res) {
        const { nameCategory } = req.body;
        try {
            const category = await CategoryModule_1.default.findOne({
                nameCategory,
            });
            if (category)
                return res.status(400).json({
                    success: false,
                    message: process.env.MSG_CATEGORY_EXISTS,
                });
            const newCategory = new CategoryModule_1.default({ nameCategory });
            await newCategory.save();
            return res.status(200).json({
                success: true,
                message: process.env.MSG_CREATE_CATEGORY_SUCCESS,
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: process.env.MSG_INTERNAL_SERVER_ERROR,
            });
        }
    }
    deleteCategory(req, res) {
        CategoryModule_1.default.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({
            success: true,
            message: process.env.MSG_DELETE_CATEGORY_SUCCESS,
        }))
            .catch((err) => res.status(500).json({ success: false, message: err.message }));
    }
    updateCategory(req, res) {
        CategoryModule_1.default.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.status(200).json({
            success: true,
            message: process.env.MSG_UPDATE_CATEGORY_SUCCESS,
        }))
            .catch((err) => res.status(500).json({ success: false, message: err.message }));
    }
}
exports.default = new CategoryController();
//# sourceMappingURL=categoryController.js.map