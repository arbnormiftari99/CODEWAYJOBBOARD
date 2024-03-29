const mongoose = require('mongoose');
const Jobs = require('../models/jobs_model');
const asyncHandler = require('express-async-handler');


const createJob = asyncHandler(async (req, res) => {
    const { title, companyname,location, description } = req.body;
    try {
        const createNewJob = await Jobs.create({ 
            title,
            companyname,
            location,
            description
        });
       await createNewJob.save();
        res.status(200).json({
            title,
            companyname,
            location,
            description
        });

    } catch (error) {
       res.status(error.statusCode).json(error.message);
    }
})

const getAllJobs = asyncHandler(async (req, res) => {
    try {
        const allJobs = await Jobs.find();
        res.status(200).json(allJobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const updateJob = asyncHandler(async (req, res) => {
  const jobId = req.params.id;
  const { title, companyname, location, description } = req.body;
  try {
    if(!jobId){
        return res.status(400).json({ message: "Job id is required for update"});
    }

    const updateJob = await Jobs.findByIdAndUpdate(jobId, {
        title,
        companyname,
        location,
        description
    }, { new: true});
    if(!updateJob){
        return res.status(404).json({ message: "Job not found"});
    }
    res.status(200).json(updateJob);
  } catch (error) {
    res.status(error.message);
  }
})



module.exports = { getAllJobs, createJob, updateJob }