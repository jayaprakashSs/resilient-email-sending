const EmailService = require('../src/EmailService');
const MockProvider1 = require('../src/MockProvider1');
const MockProvider2 = require('../src/MockProvider2');

test('EmailService retries on failure and switches providers', async () => {
    const provider1 = new MockProvider1();
    const provider2 = new MockProvider2();

    const emailService = new EmailService([provider1, provider2]);

    try {
        const result = await emailService.sendEmail('email123', 'test@example.com', 'Subject', 'Body');
        expect(result).toBeDefined();
    } catch (error) {
        fail('Email should have been sent');
    }
});
