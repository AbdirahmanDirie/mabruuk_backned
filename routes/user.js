const express = require('express');
const router = express.Router()

const {
    registerUser,
    loginUser,
    changePassword,
    UpdateUser,
    getAllUsers,
    forgotPassword,
    resetPassword,
    getAllActiveUsers,
    getAllInActiveUsers,
    UpdateImage,
    GetUserById,
    searchUser,
    deleteUser
  } = require('../controllers/user');
  
  const {protect} = require('../middlewares/verifyToken')
  const {upload} = require('../utils/fileUpload')

router.post('/register',protect, registerUser);
router.put('/image',protect,upload.single("image"), UpdateImage);
router.post('/login', loginUser);
router.put('/changePassword',protect, changePassword);
router.put('/update/:id',protect, UpdateUser,);
router.get('/', getAllUsers);
router.get('/search', searchUser);
router.get('/user/:id', GetUserById);
router.get('/active', getAllActiveUsers);
router.get('/inactive', getAllInActiveUsers);
router.post("/forgotpassword", forgotPassword)
router.put("/resetpassword/:resetToken",resetPassword )
router.delete("/user/:id",protect,deleteUser )


module.exports = router