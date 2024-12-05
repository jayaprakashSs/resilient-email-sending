class CircuitBreaker {
    constructor(maxFailures, resetTime) {
        this.maxFailures = maxFailures;
        this.resetTime = resetTime;
        this.failures = {};
    }

    isAvailable(providerName) {
        const failureInfo = this.failures[providerName];
        if (!failureInfo) return true;

        const { count, timestamp } = failureInfo;
        if (count >= this.maxFailures) {
            const elapsed = Date.now() - timestamp;
            if (elapsed < this.resetTime) {
                return false;
            } else {
                delete this.failures[providerName];
            }
        }
        return true;
    }

    recordFailure(providerName) {
        const now = Date.now();
        if (!this.failures[providerName]) {
            this.failures[providerName] = { count: 1, timestamp: now };
        } else {
            this.failures[providerName].count++;
            this.failures[providerName].timestamp = now;
        }
    }
}

module.exports = CircuitBreaker;
