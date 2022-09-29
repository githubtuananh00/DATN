"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = __importDefault(require("cloudinary"));
const fs_1 = __importDefault(require("fs"));
class UploadController {
    uploadFile(req, res) {
        console.log(req.body);
        try {
            if (!req.body)
                return res
                    .status(400)
                    .json({ success: false, message: 'No files were uploaded' });
            const file = req.body;
            console.log(file);
            if (file.size > 1024 * 1024) {
                removeTmp(file.path);
                return res
                    .status(400)
                    .json({ success: false, message: 'Size too large' });
            }
            if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
                removeTmp(file.path);
                return res.status(400).json({
                    success: false,
                    message: 'File format is incorrect',
                });
            }
            cloudinary_1.default.v2.uploader.upload(file.path, { folder: 'test' }, async (err, result) => {
                if (err)
                    return res.status(400).json({
                        success: false,
                        error: err.message,
                    });
                removeTmp(file.path);
                return res.json({
                    success: true,
                    payload: {
                        url: result.secure_url,
                        public_id: result.public_id,
                    },
                });
            });
        }
        catch (error) {
            return res
                .status(500)
                .json({ success: false, message: error.message });
        }
    }
    deleteFile(req, res) {
        try {
            const { public_id } = req.body;
            if (!public_id)
                return res
                    .status(400)
                    .json({ status: false, message: 'No Image Selected' });
            cloudinary_1.default.v2.uploader
                .destroy(public_id)
                .then(() => res.json({ success: true, message: 'Deleted Image' }))
                .catch((err) => res
                .status(400)
                .json({ success: false, message: err.message }));
        }
        catch (error) {
            return res
                .status(500)
                .json({ status: false, message: error.message });
        }
    }
}
const removeTmp = (path) => {
    fs_1.default.unlink(path, (err) => {
        if (err)
            throw err;
    });
};
exports.default = new UploadController();
//# sourceMappingURL=uploadController.js.map