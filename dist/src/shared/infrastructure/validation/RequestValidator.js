"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestValidator = void 0;
const express_validator_1 = require("express-validator");
const RequestValidator = (req, res, next) => {
    const errorFormatter = ({ msg, param }) => {
        return { parameter: param, message: msg };
    };
    const errors = (0, express_validator_1.validationResult)(req).formatWith(errorFormatter).array({ onlyFirstError: true });
    if (errors.length > 0) {
        res.status(400).json({ errors: errors });
    }
    next();
};
exports.RequestValidator = RequestValidator;
