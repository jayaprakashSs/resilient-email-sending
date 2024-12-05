const EmailService = require('./EmailService');
const MockProvider1 = require('./MockProvider1');
const MockProvider2 = require('./MockProvider2');

const provider1 = new MockProvider1();
const provider2 = new MockProvider2();

const emailService = new EmailService([provider1, provider2]);

(async () => {
    try {
        const result = await emailService.sendEmail(
            'email123',
            'recipient@example.com',
            'Hello!',
            'This is a test email.'
        );
        console.log(result);
    } catch (error) {
        console.error('Failed to send email:', error.message);
    }
})();
