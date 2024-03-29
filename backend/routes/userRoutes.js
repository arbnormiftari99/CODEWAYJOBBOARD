const express = require('express');
const { authUser,
     registerUser, 
     logoutUser, 
     getUserProfile, 
     updateUserProfile } = require('../controllers/userController');
const router = express.Router();


router.post('/auth', authUser);
router.post('/', registerUser);
router.post('/logout', logoutUser);
router.route('/profile').get(getUserProfile).put(updateUserProfile);





module.exports = router;