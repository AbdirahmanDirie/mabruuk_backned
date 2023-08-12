const asyncHandler = require("express-async-handler");
const {Client} = require("../models/client");

// Create Client
const CreateClient = asyncHandler(async (req, res)=>{
   
    try {
    const { name, phone, mobile} = req.body;
    if(!name || !phone || !mobile) return res.status(404).json("All fields are required");

    const client = await Client.create({
        name, phone, mobile
    });
        return res.status(201).json(client)
      } catch (err) {
            res.status(500).json(err.message);
      }
  });

// Update Client
const UpdateClient = asyncHandler(async (req, res)=>{
    
    try {
    const client = await Client.findById(req.params.id)

    if(!client){
       return res.status(404).json("client not found")
    }
    
        const updated = await Client.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
          res.status(201).json(updated)

      } catch (err) {
        
        if(err.kind == 'ObjectId'){
            return res.status(400).json({msg: 'Client Id not found'});
             }
            res.status(500).json(err.message);
      }
  })

// Get All Client
const GetAllClients = asyncHandler(async (req, res)=>{
    try {
        const client = await Client.find();
        res.status(200).json(client);
      } catch (err) {
        if(err.kind == 'ObjectId'){
            return res.status(400).json({msg: 'client Id not found'});
             }
            res.status(500).json(err.message);
      }
  });

  //Search Client
  const searchClient = asyncHandler(async (req, res)=>{
    const { name } = req.query;
    const query = {};
  
    if (name) {
      query.name = { $regex: name, $options: 'i' };
    }
      try {
        const clients = await Client.find(query);
        res.json(clients);
      } catch (error) {
        if(error.kind == 'ObjectId'){
          return res.status(400).json({msg: 'User not found'});
           }
        res.status(404).json({ message: error.message });
      }
  });


// Delete Client
const DeleteClient = asyncHandler(async (req, res)=>{
  try {
    const client = await Client.findById(req.params.id);

    if (!client) {
      return res.status(404).json('Client not found');
    }

    const updated = await Client.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.status(201).json(updated);
    
  } catch (error) {
    if(error.kind == 'ObjectId'){
      return res.status(400).json({msg: 'Client Id not found'});
       }
    res.status(404).json({ message: error.message });
  }
});


module.exports = {
  CreateClient,
  UpdateClient,
  GetAllClients,
  DeleteClient,
  searchClient
}