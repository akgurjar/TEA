
import * as twilio from 'twilio';

const accountSID = 'ACafdb90ec8b5223af55f1cd46ebccd214';
const authToken = '1d1ff91ba6dfe4931d43b2153b93478a';

const twilioClient: twilio.Twilio = twilio(accountSID, authToken);


export async function sendOTP(mobile: string, otp: string) {
    const messageBody = `Your one-time passcode: ${otp} Please enter it to login into efarmer app.`;
    return await sendSMS(mobile, messageBody);
}


export async function sendSMS(mobile: string, body: string) {
    const message = await twilioClient.messages.create({
        from: '+12569063701',
        to: mobile,
        body
    });
    return message;
}