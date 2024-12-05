const MockProvider1 = require('../src/MockProvider1');

describe('MockProvider1', () => {
    let provider;

    beforeEach(() => {
        provider = new MockProvider1();
    });

    test('should return success message on successful send', async () => {
        jest.spyOn(Math, 'random').mockReturnValue(0.8); // Simulate successful send

        const recipient = 'test@example.com';
        const subject = 'Test Subject';
        const body = 'Test Body';

        const result = await provider.send(recipient, subject, body);
        expect(result).toBe(`Email sent by Provider1 to ${recipient}`);
    });

    test('should throw an error on failure', async () => {
        jest.spyOn(Math, 'random').mockReturnValue(0.5); // Simulate failure

        const recipient = 'test@example.com';
        const subject = 'Test Subject';
        const body = 'Test Body';

        await expect(provider.send(recipient, subject, body)).rejects.toThrow('Provider1 failed');
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });
});
