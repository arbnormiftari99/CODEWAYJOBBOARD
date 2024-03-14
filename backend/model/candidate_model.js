const mongoose = require('mongoose');

const candidateSchema = new Schema({
    name: {
    type: String, 
    required: true
    },
    surname: {
        type: String,
        required: true
    },
    password: {type: String,
        required: true
    }
})

module.exports = mongoose.model('Candidate', candidateSchema);