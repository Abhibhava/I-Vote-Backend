// tasks/cronJob.js
const cron = require('node-cron');
const updateElectionStatuses = require('./scheduled');

// Schedule the task to run every hour
cron.schedule('* * * * *', updateElectionStatuses,{
    scheduled: true
}) // Optional: specify your timezone);
//  {
//     scheduled: true,
//     timezone: "Your/Timezone"
//  }