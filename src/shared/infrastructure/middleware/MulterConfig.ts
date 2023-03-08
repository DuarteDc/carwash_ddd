import { Request } from 'express';
import multer, { FileFilterCallback } from "multer";

type FileNameCallback = (error: Error | null, filename: string) => void

export const multerConfig = {
    storage: multer.diskStorage({
        filename: function (req: Request, file: Express.Multer.File, cb: FileNameCallback) {
            cb(null, file.originalname);
        }
    }),

    fileFilter: (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
        // if (file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "image/jpg") {
        //     return cb(null, false);
        // }
        cb(null, true);
    }
}