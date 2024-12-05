const RateLimiter = require('./RateLimiter');
const CircuitBreaker = require('./CircuitBreaker');
const StatusTracker = require('./StatusTracker');

class EmailService {
    constructor(providers) {
        this.providers = providers;
        this.currentProviderIndex = 0;
        this.rateLimiter = new RateLimiter(10, 1000); // 10 emails per second
        this.circuitBreaker = new CircuitBreaker(3, 60000); // 3 failures, 1-minute reset
        this.statusTracker = new StatusTracker();
    }

    async sendEmail(emailId, recipient, subject, body) {
        if (!this.rateLimiter.allow()) {
            throw new Error('Rate limit exceeded');
        }

        const provider = this.getCurrentProvider();
        if (!this.circuitBreaker.isAvailable(provider.name)) {
            this.switchProvider();
        }

        try {
            this.statusTracker.startAttempt(emailId, provider.name);
            const result = await this.retryWithExponentialBackoff(() =>
                provider.send(recipient, subject, body)
            );
            this.statusTracker.success(emailId);
            return result;
        } catch (error) {
            this.circuitBreaker.recordFailure(provider.name);
            this.statusTracker.fail(emailId, error.message);
            this.switchProvider();
            throw error;
        }
    }

    async retryWithExponentialBackoff(task, retries = 3, delay = 500) {
        for (let i = 0; i < retries; i++) {
            try {
                return await task();
            } catch (error) {
                if (i === retries - 1) throw error;
                await new Promise((resolve) => setTimeout(resolve, delay * Math.pow(2, i)));
            }
        }
    }

    switchProvider() {
        this.currentProviderIndex = (this.currentProviderIndex + 1) % this.providers.length;
    }

    getCurrentProvider() {
        return this.providers[this.currentProviderIndex];
    }
}

module.exports = EmailService;
