const express = require('express');
const { createJob, getAllJobs, updateJob, getJobById, deleteJobById} = require('../controllers/jobs_Controller');
const { applyForJobs, getAllJobApplications } = require('../controllers/job_application');
const router = express.Router();
const protect = require('../middleware/authMiddleware');



router.post('/createjob', protect, createJob);
router.get('/', getAllJobs);
router.get('/:id', getJobById);
router.delete('/:id', deleteJobById);
router.put('/update/:id', updateJob);
router.post('/applyjob', applyForJobs);
router.get('/applications', getAllJobApplications);


module.exports = router