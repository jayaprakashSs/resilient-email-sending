class StatusTracker {
    constructor() {
        this.status = {};
    }

    startAttempt(emailId, provider) {
        this.status[emailId] = { provider, status: 'Attempting', error: null };
    }

    success(emailId) {
        this.status[emailId].status = 'Success';
    }

    fail(emailId, error) {
        this.status[emailId].status = 'Failed';
        this.status[emailId].error = error;
    }

    getStatus(emailId) {
        return this.status[emailId] || 'Unknown';
    }
}

module.exports = StatusTracker;
