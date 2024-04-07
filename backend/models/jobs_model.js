const mongoose = require('mongoose');

const jobsListingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    companyname: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }

})

module.exports = mongoose.model('JobListing', jobsListingSchema);