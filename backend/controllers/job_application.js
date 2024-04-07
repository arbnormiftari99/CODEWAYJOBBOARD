const JobApplication = require('../models/jobapplication_model');
const asyncHandler = require('express-async-handler');

const applyForJobs = asyncHandler(async (req, res) => {
    try {
        const { userId, jobId, resume, coverLetter } = req.body;
        const newJobApplication = new JobApplication({
            candidate: userId,
            jobId,
            resume,
            coverLetter
        });

        await newJobApplication.save();
        res.status(201).json({success: true, data: newJobApplication});
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
        throw new Error('Could not create');


    }
})


const getAllJobApplications = async (req, res) => {
    try {
        const jobApplications = await JobApplication.find();
        res.status(200).json({ success: true, data: jobApplications });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};


module.exports = { applyForJobs, getAllJobApplications}