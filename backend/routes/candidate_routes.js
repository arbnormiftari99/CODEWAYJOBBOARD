const express = require('express');
const candidateController = require('../controllers/candidate_Controller');
const router = express.Router();


router.post('/', candidateController.createCandidate);
router.get('/', candidateController.getAllCandidates);





module.exports = router;