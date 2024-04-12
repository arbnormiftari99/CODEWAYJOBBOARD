const jwt = require('jsonwebtoken');

const generateToken = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });

    const cookieOptions = {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    };

    if (process.env.NODE_ENV === 'production') {
        cookieOptions.secure = true; 
        cookieOptions.sameSite = 'None'; 
    }

    res.cookie('jwt', token, cookieOptions);
};

module.exports = generateToken;
