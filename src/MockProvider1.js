class MockProvider1 {
    constructor() {
        this.name = 'Provider1';
    }

    async send(recipient, subject, body) {
        if (Math.random() < 0.7) throw new Error('Provider1 failed');
        return `Email sent by Provider1 to ${recipient}`;
    }
}

module.exports = MockProvider1;
