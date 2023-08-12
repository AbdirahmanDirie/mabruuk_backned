const express = require('express');

const  {
  CreateCategory,
  UpdateCategory,
  GetAllCategory,
  DeleteCategory
} = require('../controllers/category');

const router = express.Router();

const {adminRole} = require('../middlewares/roles')
const {protect} = require('../middlewares/verifyToken')

// Create Category
router.post("/",protect,adminRole, CreateCategory);

//update Category 
router.put("/category/:id",protect, adminRole, UpdateCategory);

//get all Categories
router.get("/", GetAllCategory);

//delete Category
router.put("/category/:id",protect, adminRole, DeleteCategory);



module.exports = router