"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerController = void 0;
const ErrorHandler_1 = require("../../../shared/domain/ErrorHandler");
class CustomerController {
    constructor(customerUseCase) {
        this.customerUseCase = customerUseCase;
    }
    getCustomerDetail(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const customer = yield this.customerUseCase.getDetailCustomer(id);
                return res.json({ customer });
            }
            catch (error) {
                next(new ErrorHandler_1.ErrorHandler('Error to find user', 404));
            }
        });
    }
}
exports.CustomerController = CustomerController;
