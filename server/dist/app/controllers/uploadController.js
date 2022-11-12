"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = __importDefault(require("cloudinary"));
const fs_1 = __importDefault(require("fs"));
class UploadController {
    uploadFile(req, res) {
        try {
            if (!req.body)
                return res.status(400).json({
                    success: false,
                    message: process.env.MSG_NO_FILES_UPLOADED,
                });
            const file = req.body;
            if (file.size > 1024 * 1024) {
                removeTmp(file.path);
                return res.status(400).json({
                    success: false,
                    message: process.env.MSG_SIZE_TO_LARGE,
                });
            }
            if (file.type !== process.env.FILE_IMG_JPEG &&
                file.type !== process.env.FILE_IMG_PNG) {
                removeTmp(file.path);
                return res.status(400).json({
                    success: false,
                    message: process.env.MSG_FILE_FORMAT_INCORRECT,
                });
            }
            cloudinary_1.default.v2.uploader.upload(file.path, { folder: 'HouseWare' }, async (err, result) => {
                if (err)
                    return res.status(400).json({
                        success: false,
                        error: err.message,
                    });
                removeTmp(file.path);
                return res.status(200).json({
                    success: true,
                    payload: {
                        url: result.secure_url,
                        public_id: result.public_id,
                    },
                });
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: process.env.MSG_INTERNAL_SERVER_ERROR,
            });
        }
    }
    deleteFile(req, res) {
        try {
            const { public_id } = req.body;
            if (!public_id)
                return res.status(400).json({
                    status: false,
                    message: process.env.MSG_NO_IMG_SELECTED,
                });
            cloudinary_1.default.v2.uploader
                .destroy(public_id)
                .then(() => res.status(200).json({
                success: true,
                message: process.env.MSG_DELETE_IMG_SUCCESS,
            }))
                .catch((err) => res
                .status(400)
                .json({ success: false, message: err.message }));
        }
        catch (error) {
            return res.status(500).json({
                status: false,
                message: process.env.MSG_INTERNAL_SERVER_ERROR,
            });
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