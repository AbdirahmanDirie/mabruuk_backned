const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler')
const { User } = require("../models/user");


const protect = asyncHandler(async (req, res, next) => {
    let token

    if(
        req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
    ){

        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1]
      
            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
      
            // Get user from the token
            req.user = await User.findById(decoded.id).select('-password');
            next()
          } catch (error) {
            console.log(error.message)
            return res.status(401).json({msg: 'Not authorized'})
          }

    }

    if (!token) {
        return res.status(401).json({msg: 'Not Authorized, No Token'})
      }

})


module.exports = { protect }

