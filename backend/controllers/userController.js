const mongoose = require('mongoose');
const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');



const authUser = asyncHandler(async (req, res) => {

    res.status(200).json({ message: 'Auth user'});

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

const loginUser = asyncHandler(async (req, res) => {

    res.status(200).json({ message: 'Login user'});

})

const logoutUser = asyncHandler(async (req, res) => {

    res.status(200).json({ message: 'Logout user'});

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
    loginUser,
    logoutUser,
    getUserProfile,
    updateUserProfile
 };
