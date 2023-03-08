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
exports.TwilioService = void 0;
const twilio_1 = require("twilio");
class TwilioService {
    constructor() {
        this.accountSid = process.env.TWILIO_ACCOUNT_SID;
        this.authToken = process.env.TWILIO_AUTH_TOKEN;
        this.twilioNumber = process.env.TWILIO_PHONE_NUMBER;
        this.myNumber = process.env.MY_NUMBER;
        this.twilio = new twilio_1.Twilio(this.accountSid, this.authToken);
    }
    sendSMS(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.twilio.messages.create({
                    from: this.twilioNumber,
                    to: this.myNumber || '',
                    body,
                }).then((message) => {
                    resolve(message);
                }).catch((error) => {
                    throw Error('Hubo un error al enviar el mensaje');
                });
            });
        });
    }
}
exports.TwilioService = TwilioService;
