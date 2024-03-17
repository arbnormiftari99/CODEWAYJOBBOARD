const mongoose = require('mongoose');
const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');


const authUser = asyncHandler(async (req, res) => {

    res.status(200).json({ message: 'Auth user'});

})


const registerUser = asyncHandler(async (req, res) => {

    res.status(200).json({ message: 'Register user'});

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
