const mongoose = require('mongoose');

const jobsListingSchema = new Schema({
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
    }
})

module.exports = mongoose.model('JobListing', jobsListingSchema);