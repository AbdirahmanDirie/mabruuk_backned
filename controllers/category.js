const asyncHandler = require("express-async-handler");
const {Category} = require("../models/category");


// Create Category
const CreateCategory = asyncHandler(async (req, res)=>{
   
    try {
    const { name} = req.body;
    console.log(req.body)
    if(!name) return res.status(404).json({msg: 'All fields are required'});

    const category = await Category.create({
        name
    });
        return res.status(201).json(category)
      } catch (err) {
            res.status(500).json(err.message);
      }
  });

// Update category
const UpdateCategory = asyncHandler(async (req, res)=>{
    
    try {
        
    const { name} = req.body;
      
    const category = await Category.findById(req.params.id)

    if(!name) return res.status(404).json({msg: 'All fields are required'});

    if(!category){
       return res.status(404).json({msg: 'Service does not exist'})
    }
    
        const updated = await Category.findByIdAndUpdate(req.params.id, {name}, {new: true, runValidators: true});
          res.status(201).json(updated)

      } catch (err) {
        
        if(err.kind == 'ObjectId'){
            return res.status(400).json({msg: 'Category Id not found'});
             }
            res.status(500).json(err.message);
      }
  });
  
// Get All category
const GetAllCategory = asyncHandler(async (req, res)=>{
    try {
        const category = await Category.find();
        res.status(200).json(category);
      } catch (err) {
        if(err.kind == 'ObjectId'){
            return res.status(400).json({msg: 'category Id not found'});
             }
            res.status(500).json(err.message);
      }
  });

// Delete Category
const DeleteCategory = asyncHandler(async (req, res)=>{
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json('Category not found');
    }

    const updated = await Category.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.status(201).json(updated);
    
  } catch (error) {
    if(error.kind == 'ObjectId'){
      return res.status(400).json({msg: 'Category Id not found'});
       }
    res.status(404).json({ message: error.message });
  }
})


module.exports = {
  CreateCategory,
  UpdateCategory,
  GetAllCategory,
  DeleteCategory
}