const jwt = require('jsonwebtoken')
const User = require('../models/userModel.js')

const requireSignIn = async (req, res, next) => {
    const { authorization } = req.headers
    try {
        const token = authorization.split(' ')[1]
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );
        // req.existingUser = decode
        const { userId } = decoded
        req.userId = userId
        console.log(req.userId);
        next();
    } catch (error) {
        return res.status(400).json({ msg: error.message })
    }
}



module.exports = { requireSignIn }