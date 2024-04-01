const express = require('express');
const { createJob, getAllJobs, updateJob, getJobById } = require('../controllers/jobs_Controller');
const router = express.Router();
const protect = require('../middleware/authMiddleware');



router.post('/createjob', protect, createJob);
router.get('/', getAllJobs);
router.get('/:id', getJobById);
router.put('/update/:id', updateJob);

module.exports = router