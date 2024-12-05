class MockProvider2 {
    constructor() {
        this.name = 'Provider2';
    }

    async send(recipient, subject, body) {
        if (Math.random() < 0.5) throw new Error('Provider2 failed');
        return `Email sent by Provider2 to ${recipient}`;
    }
}

module.exports = MockProvider2;
