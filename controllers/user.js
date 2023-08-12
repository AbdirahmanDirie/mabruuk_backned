const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user');
const asyncHandler = require("express-async-handler");
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');
const { fileSizeFormatter } = require('../utils/fileUpload');
const cloudinary = require('../utils/cloudinary');
const { response } = require('express');
const Token = require('../models/Token');


// Register User
const registerUser = asyncHandler(async (req, res) => {
    const { firstName, lastName,email, type, phone} = req.body;

 try {

     //check duplicate email address
     const emailExist = await User.findOne({email: req.body.email});
     if(emailExist) { return res.status(400).json('Email already exists')
    }


    //all fields are required
    if(!phone || !firstName || !lastName){ return res.status(400).json('All fields required')
  }


    //password hashing algorithm
   const salt = await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash(req.body.password, salt);
  
  
  const user = await User.create({
    firstName,
    lastName,
    email,
    type,
    phone,
    password: hashedPassword,
  });

  if(user){
    res.status(201).json(user)
  }

    } catch (error) {
        res.status(400).json(error.message)
    }
});


// Update image
const UpdateImage = asyncHandler(async (req, res) => {
    try {
  
        //Handle image upload
        let fileData = {}
  
      if(req.file){
        //save image cloudinary
        let uploadedFile;
        try {
            uploadedFile = await cloudinary.uploader.upload(req.file.path, {folder: "mabruuk", resource_type: "image"})
        } catch (error) {
            res.status(500)
            throw new Error("Image Could not be uploaded")
        }
  
        fileData = {
            fileName : req.file.originalname,
            filePath : uploadedFile.secure_url,
            fileType : req.file.mimetype,
            fileSize : fileSizeFormatter(req.file.size, 2),
        }
    }
  
  
  
      const ImageData = {
        image:fileData
      }
  
      const user = await User.findById(req.user._id);
      if (!user) {
        return res.status(404).send('user not found');
      }
  
      const updated = await User.findByIdAndUpdate(req.user._id, ImageData, {new: true});
        res.status(201).json(updated)
      
    } catch (error) {
      if(error.kind == 'ObjectId'){
        return res.status(400).json({msg: 'User Id not found'});
         }
    res.status(500).json({ message: error.message });
    }
  
  })


//login User
const loginUser = asyncHandler(async (req, res) => {
     try {
    const { email } = req.body;
    if(!email || !req.body.password) { return res.status(400).json({msg: "All fields are required" })}
  
    // Check for user email
    const user = await User.findOne({ email })
    if(!user){return res.status(404).json({msg: 'User not found'})}

    //checking the password
    const validPass = await bcrypt.compare(req.body.password, user.password)
    //validate the password
    if(!validPass) { res.status(404)
      return res.status(404).json({msg: 'Invalid Password'})
      }

      if(user.status === 'inactive'){
        return res.status(404).json('Account Closed, Please contact Jobful support team.')
      }

  
      if (user && validPass) {
        res.json({
          _id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          image: user.image,
          type: user.type,
          phone: user.phone,
          status: user.status,
          token: generateToken(user._id)
        })
  
  
      } else {
        return res.status(404).json({msg: 'Invalid Credentials'})
      }
    } catch (error) {
      res.json({error})
    }

});

//change password
const changePassword =asyncHandler( async (req, res, next) => {
    try {
      const { oldPassword, newPassword } = req.body;


      // Check if the old password is correct
      const user = await User.findById(req.user._id);
      const passwordMatch = await bcrypt.compare(oldPassword, user.password);
      if (!passwordMatch) return res.status(400).json({msg: 'Old password not correct'});
  
      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
  
      // Update the user's password
      await User.findByIdAndUpdate(req.user._id, { password: hashedPassword });
  
      res.status(200).json({ msg: "Password changed successfully" });
    } catch (error) {
      next(error);
    }
  });

//update user
const UpdateUser = asyncHandler(async (req, res)=>{
    try {
        const {firstName, lastName, email, phone, type} = req.body;

        const user = await User.findByIdAndUpdate(req.params.id, {firstName, lastName, email, phone, type}, {new: true});
        res.status(201).json(user);
    } catch (error) {
      if(error.kind == 'ObjectId'){
        return res.status(400).json({msg: 'User not found'});
         }
      res.status(404).json({ message: error.message });
    }
});

//get all users
const getAllUsers = asyncHandler(async (req, res)=>{
    try {
      const search = req.query.search || "";
        const users = await User.find().select('-password').sort({createdAt: -1}).exec();
        res.status(200).json(users);
    } catch (error) {
      if(error.kind == 'ObjectId'){
        return res.status(400).json({msg: 'User not found'});
         }
      res.status(404).json({ message: error.message });
    }
});
//saerch users
const searchUser = asyncHandler(async (req, res)=>{
  const { firstName, lastName } = req.query;
  const query = {};

  if (firstName) {
    query.firstName = { $regex: firstName, $options: 'i' };
  }

  if (lastName) {
    query.lastName = { $regex: lastName, $options: 'i' };
  }
    try {
      const users = await User.find(query).select('-password');
      res.json(users);
    } catch (error) {
      if(error.kind == 'ObjectId'){
        return res.status(400).json({msg: 'User not found'});
         }
      res.status(404).json({ message: error.message });
    }
});

// Get User By Id
const GetUserById = asyncHandler(async (req, res)=>{
  try {
      const user = await User.findById(req.params.id);
      res.status(200).json(user);
    } catch (err) {
      if(err.kind == 'ObjectId'){
          return res.status(400).json({msg: 'user Id not found'});
           }
          res.status(500).json(err.message);
    }
});
//get all active users
const getAllActiveUsers = asyncHandler(async (req, res)=>{
    try {
        const users = await User.find({status: 'active'}).select('-password').sort({createdAt: -1}).exec();
        res.status(200).json(users);
    } catch (error) {
      if(error.kind == 'ObjectId'){
        return res.status(400).json({msg: 'User not found'});
         }
      res.status(404).json({ message: error.message });
    }
  });

  //Delete user
  const deleteUser = async (req, res) => {
  
    try {
      const deleted = await User.findByIdAndDelete(req.params.id);
  
      if (!deleted) {
        throw new Error('User not found');
      }
  
      res.status(200).json(deleted);
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  };

// get all inactive users
  const getAllInActiveUsers = asyncHandler(async (req, res)=>{
    try {
        const users = await User.find({status: 'inactive'}).select('-password').sort({createdAt: -1}).exec();
        res.status(200).json(users);
    } catch (error) {
      if(error.kind == 'ObjectId'){
        return res.status(400).json({msg: 'User not found'});
         }
      res.status(404).json({ message: error.message });
    }
  });

//forgot Password
const forgotPassword =asyncHandler( async(req, res)=>{
    const {email} = req.body
    const user = await User.findOne({email})

    console.log(email)

    if(!user){
        return res.status(404).json("Email Not Found")
    }
    
    //Delete token if exist in DB
    let token = await Token.findOne({userId: user._id})
    if(token){
        await token.deleteOne()
    }
    
    //create reset token
    let resetToken = crypto.randomBytes(32).toString("hex") + user._id;
    
    
    //hash token before saving
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex")
    
    // Save token to DB
    await new Token({
        userId: user._id,
        token: hashedToken,
        createdAt: Date.now(),
        expiresAt: Date.now() + 30 * (60 * 1000) // thirty minute
    }).save()
    
    //construct reset url
    const resetUrl = `http://127.0.0.1:5173/resetpassword/${resetToken}`;
    
    // Reset email
    const message = `
        <h2>Hi ${user.firstName} ${ user.lastName}</h2>
        <p>You have just requested a new password for your Mabruuk Event Management account.</p>
        <p>To confirm this password request, click the button below:</p>
        <p>This reset link is valid for only 30 Minutes.</p>
        <a href=${resetUrl} click tracking=off> ${resetUrl} </a>
        <p>If you did not request a password reset, please ignore this email.</p>
        <p>Thank you</p>
        <p>The Mabruuk Support Team</p>
    `;
    
    const subject = "Password Reset Request"
    const send_to = user.email
    const sent_from = process.env.EMAIL_USER
    
    try {
        await sendEmail(subject, message, send_to, sent_from)
        res.status(200).json("Reset Email Sent")
    
    } catch (error) {
        return res.status(500).json("Email not sent, please try again ")
    }
    
    })
    
    
    //reset Password
const resetPassword = asyncHandler(async(req, res)=>{
        const {password} = req.body;
        const {resetToken} = req.params;
    
        //Hash token, then compare to token in DB
        const hashedToken = crypto.createHash("sha256").update(resetToken).digest('hex');
    
        //find token in db
        const userToken = await Token.findOne({
            token: hashedToken,
            expiresAt: {$gt: Date.now()}
        })
    
        if(!userToken){
            return res.status(404).json("Invalid token")
    
        }
        //find user
        const user = await User.findOne({_id: userToken.userId});
  
        // Hash the new password
      const hashedPassword = await bcrypt.hash(password, 10);
  
        user.password = hashedPassword
        await user.save();
        return res.status(200).json( "Password reset successful, please login")
    
  })
  
  
    // Generate JWT
    const generateToken = (id) => {
      return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
      })
    }


module.exports = {
        registerUser,
        UpdateUser,
        loginUser,
        changePassword,
        getAllUsers,
        forgotPassword,
        resetPassword,
        getAllActiveUsers,
        getAllInActiveUsers,
        UpdateImage,
        GetUserById,
        searchUser,
        deleteUser      
}