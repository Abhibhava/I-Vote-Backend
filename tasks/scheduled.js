// tasks/scheduledTasks.js
const mongoose = require('mongoose');
const Election = require('../model/Election'); // Adjust the path as needed

const updateElectionStatuses = async () => {
    try {
        const now = new Date();
        await Election.updateMany(
            { votingEndTime: { $lt: now }, status: 'Live' },
            { $set: { status: 'Closed' } }
        );
        console.log('Election statuses updated.');
    } catch (error) {
        console.error('Error updating election statuses:', error);
    }
};

module.exports = updateElectionStatuses;
