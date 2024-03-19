const mongoose = require('mongoose');
const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const generateToken = require('../utils/generateToken');



const authUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    const user = await User.findOne({ email});

    if(user && (await user.matchPassword(password))){
        generateToken(res, user._id);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        });
    }else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
})


const registerUser = asyncHandler(async (req, res) => {
   const {name, email, password, role} = req.body;
    const userExists = await User.findOne({ email });
   if(userExists){
    res.status(400);
    throw new Error('User already exists');
   }
    const user = await User.create({
    name,
    email,
    password,
    role
   })
    if(user){
    generateToken(res, user._id)
    res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
    
    })
   } else {
    res.status(400);
    throw new Error('Invalid user data');
   }
})



const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
     httpOnly: true,
     expires: new Date(Date.now())
    })
  
    res.status(200).json({ message: 'Logged out user'});

})

const getUserProfile = asyncHandler(async (req, res) => {

    res.status(200).json({ message: 'User profile'});

})

const updateUserProfile = asyncHandler(async (req, res) => {

    res.status(200).json({ message: 'User profile updated'});

})


module.exports = { 
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile
 };
