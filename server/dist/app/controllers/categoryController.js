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
            .then((category) => res.status(200).json({ success: true, category }))
            .catch((err) => res.status(500).json({ success: false, err: err.message }));
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
                    message: 'This category already exists',
                });
            const newCategory = new CategoryModule_1.default({ nameCategory });
            await newCategory.save();
            res.json({
                success: true,
                message: 'Create a Category successfully',
            });
        }
        catch (error) {
            return res
                .status(500)
                .json({ success: false, message: error.message });
        }
    }
    deleteCategory(req, res) {
        CategoryModule_1.default.deleteOne({ _id: req.params.id })
            .then(() => res.json({
            success: true,
            message: 'Delete a category successfully',
        }))
            .catch((err) => res.status(500).json({ success: false, message: err.message }));
    }
    updateCategory(req, res) {
        CategoryModule_1.default.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.json({
            success: true,
            message: 'Update a Category successfully',
        }))
            .catch((err) => res.status(500).json({ success: false, message: err.message }));
    }
}
exports.default = new CategoryController();
//# sourceMappingURL=categoryController.js.map