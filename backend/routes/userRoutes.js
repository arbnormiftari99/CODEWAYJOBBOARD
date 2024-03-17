const express = require('express');
const { authUser,
     registerUser, 
     loginUser, 
     logoutUser, 
     getUserProfile, 
     updateUserProfile } = require('../controllers/userController');
const router = express.Router();


router.post('/auth', authUser);
router.post('/', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.route('/profile').get(getUserProfile).put(updateUserProfile);





module.exports = router;