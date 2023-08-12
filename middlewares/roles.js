const JWT = require('jsonwebtoken');
const { User } = require("../models/user");
const asyncHandler = require("express-async-handler");

const adminRole = asyncHandler(async (req, res, next) => {

    let token
    if(
        req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
    ){
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1]
      
            // Verify token
            const decoded = JWT.verify(token, process.env.JWT_SECRET)
      
            // Get user from the token
            req.user = await User.findById(decoded.id).select('-password')

            if(req.user.type !== 'admin') {
               
                return res.status(400).send("User Not Allowed")
            }
            // console.log(req.user)
      
            next()
          } catch (error) {
            console.log(error)
            return res.status(401).send("User Not Authorized")
          }
    }
})

module.exports = { adminRole }