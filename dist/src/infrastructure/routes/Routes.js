"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Router = void 0;
const express_1 = require("express");
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const Router = (apiRouter) => {
    const router = (0, express_1.Router)();
    router
        .use(apiRouter)
        .use((0, cors_1.default)())
        .use(body_parser_1.default.json())
        .use(body_parser_1.default.urlencoded({
        extended: true
    }))
        .use(apiRouter);
    return router;
};
exports.Router = Router;
