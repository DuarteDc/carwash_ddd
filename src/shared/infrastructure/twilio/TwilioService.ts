import { Twilio } from 'twilio';

export class TwilioService {

    private twilio: Twilio;
    private accountSid   = process.env.TWILIO_ACCOUNT_SID;
    private authToken    = process.env.TWILIO_AUTH_TOKEN;
    private twilioNumber = process.env.TWILIO_PHONE_NUMBER;
    private myNumber     = process.env.MY_NUMBER;

    constructor() {
        this.twilio = new Twilio(this.accountSid, this.authToken);
    }

    async sendSMS(body: string) {
        return new Promise((resolve, reject) => {
            this.twilio.messages.create({
                from : this.twilioNumber,
                to   :  this.myNumber || '',
                body,
            }).then((message) => {
                resolve(message)
            }).catch((error) => {
                throw Error('Hubo un error al enviar el mensaje');
            })
        })
    }

}