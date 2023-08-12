const asyncHandler = require("express-async-handler");
const {Service} = require("../models/services");


// Create Service
const CreateService = asyncHandler(async (req, res)=>{
   
    try {
    const { name} = req.body;
    if(!name) return res.status(404).json({msg: 'All fields are required'});

    const service = await Service.create({
        name
    });
        return res.status(201).json(service)
      } catch (err) {
            res.status(500).json(err.message);
      }
  });


// Update Service
const UpdateService = asyncHandler(async (req, res)=>{
    
    try {
        
    const { name} = req.body;
      
    const service = await Service.findById(req.params.id)

    if(!name) return res.status(404).json({msg: 'All fields are required'});
    if(!service){
       return res.status(404).json({msg: 'Srvice is not available'})
    }
    
        const updated = await Service.findByIdAndUpdate(req.params.id, {name}, {new: true, runValidators: true});
          res.status(201).json(updated)

      } catch (err) {
        
        if(err.kind == 'ObjectId'){
            return res.status(400).json({msg: 'Service Id not found'});
             }
            res.status(500).json(err.message);
      }
  });

  
// Get All Service
const GetAllServices = asyncHandler(async (req, res)=>{
    try {
        const service = await Service.find();
        res.status(200).json(service);
      } catch (err) {
        if(err.kind == 'ObjectId'){
            return res.status(400).json({msg: 'service Id not found'});
             }
            res.status(500).json(err.message);
      }
  });

// Delete service
const DeleteService = asyncHandler(async (req, res)=>{
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json('service not found');
    }

    const updated = await Service.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.status(201).json(updated);
    
  } catch (error) {
    if(error.kind == 'ObjectId'){
      return res.status(400).json({msg: 'Services Id not found'});
       }
    res.status(404).json({ message: error.message });
  }
})

module.exports = {
  CreateService,
  UpdateService,
  GetAllServices,
  DeleteService
}