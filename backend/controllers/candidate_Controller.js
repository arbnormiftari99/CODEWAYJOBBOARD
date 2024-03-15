const mongoose = require('mongoose');
const Candidate = require('../models/candidate_model');

const handleErrors = (err, res) => {
    console.log(err.stack);
    res.status(500).json({message: 'Error'});
};

const candidateController = {
    createCandidate: async (req, res) => {
        try {
            const newCandidate = new Candidate(req.body);
            const savedCandidate = await newCandidate.save();
            res.status(200).json(savedCandidate);
        } catch (error) {
            handleErrors(err, res);
        }
    },
     getAllCandidates: async (req, res) => {
        try {
            const getAll = await Candidate.find();
            res.status(200).json(getAll);
        } catch (error) {
            handleErrors(err, res);

        }
    }
}



module.exports = candidateController;
