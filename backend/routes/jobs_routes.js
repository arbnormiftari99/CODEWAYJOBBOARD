const express = require('express');
const { createJob, getAllJobs, updateJob } = require('../controllers/jobs_Controller');
const router = express.Router();


router.post('/createjob', createJob);
router.get('/', getAllJobs);
router.put('/update/:id', updateJob);

module.exports = router