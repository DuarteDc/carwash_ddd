"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Router = void 0;
const express_1 = require("express");
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const compression_1 = __importDefault(require("compression"));
const Router = (apiRouter, errorMiddleware) => {
    const router = (0, express_1.Router)();
    router
        .use((0, cors_1.default)())
        .use(body_parser_1.default.json())
        .use(body_parser_1.default.urlencoded({
        extended: false
    }))
        .use((0, compression_1.default)());
    router.use('/api', apiRouter);
    router.use(errorMiddleware.routeNotFoundErrorHandler);
    router.use(errorMiddleware.customErrorHandler);
    router.use(errorMiddleware.globalErrorHandler);
    return router;
};
exports.Router = Router;
