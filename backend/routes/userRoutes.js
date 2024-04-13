const express = require('express');
const { authUser,
     registerUser, 
     logoutUser, 
     getUserProfile, 
     updateUserProfile } = require('../controllers/userController');
const protect = require('../middleware/authMiddleware');
const router = express.Router();


router.post('/auth', authUser);
router.post('/', registerUser);
router.post('/logout', logoutUser);
router.get('/profile', getUserProfile)
router.put('/profile', updateUserProfile);





module.exports = router;