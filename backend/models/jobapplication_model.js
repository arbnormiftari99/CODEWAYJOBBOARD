const mongoose = require('mongoose');

const jobApplicationSchema = new mongoose.Schema({
    candidate: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true,
    },
    jobId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'JobListing', required: true,
    },
    resume: {
        type: String,
        required: true
    },
    coverLetter: {
        type: String,
        defaultValue: 'There doesn\'t seem to be any cover letter for this application'
    },
    applicationDate: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('jobApplication', jobApplicationSchema)