const asyncHandler = require("express-async-handler");
const {Event} = require("../models/event");
const {Category} = require("../models/category");
const {Service} = require("../models/services");
const {Client} = require("../models/client");


// Create Event
const CreateEvent = asyncHandler(async (req, res)=>{
   
    try {
    const {startDate, endDate, status, address, description} = req.body;
    if(!startDate || !endDate || !address) return res.status(404).json({msg: 'All fields are required'});

    const clientId = await Client.findById(req.body.clientId)
    if(!clientId)return res.status(404).json({msg: 'Client Id not found'});

    const categoryId = await Category.findById(req.body.categoryId)
    if(!categoryId)return res.status(404).json({msg:'Category id not found'});

    const serviceId = await Service.findById(req.body.serviceId)
    if(!serviceId)return res.status(404).json({msg:'Service id not found'});



    const event = await Event.create({
      startDate, endDate, status,description,clientId,categoryId,serviceId
    });
        return res.status(201).json(event)
      } catch (err) {
            res.status(500).json(err.message);
      }
  });


// Update Event
const UpdateEvent = asyncHandler(async (req, res)=>{
    
    try {
    const event = await Event.findById(req.params.id)

    if(!event){
       return res.status(404).json({msg:"Event id not found"})
    }
    
        const updated = await Event.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true}).populate("clientId").populate("categoryId").populate("serviceId");
          res.status(201).json(updated)

      } catch (err) {
        
        if(err.kind == 'ObjectId'){
            return res.status(400).json({msg: 'Event Id not found'});
             }
            res.status(500).json(err.message);
      }
  })

  
// Get All Event
const GetAllEvents = asyncHandler(async (req, res)=>{
    try {
        const event = await Event.find().populate("clientId").populate("categoryId").populate("serviceId");
        res.status(200).json(event);
      } catch (err) {
            res.status(500).json(err.message);
      }
  })

// Get Booked Event
const GetBookedEvents = asyncHandler(async (req, res)=>{
    try {
        const event = await Event.find({status: "Booked"}).populate("clientId").populate("categoryId").populate("serviceId");
        res.status(200).json(event);
      } catch (err) {
            res.status(500).json(err.message);
      }
  })

// Get Approved Event
const GetApprovedEvents = asyncHandler(async (req, res)=>{
    try {
        const event = await Event.find({status: 'Approved'}).populate("clientId").populate("categoryId").populate("serviceId");
        res.status(200).json(event);
      } catch (err) {
            res.status(500).json(err.message);
      }
  })
// Get Canceled Event
const GetCanceledEvents = asyncHandler(async (req, res)=>{
    try {
        const event = await Event.find({status: 'Canceled'}).populate("clientId").populate("categoryId").populate("serviceId");
        res.status(200).json(event);
      } catch (err) {
            res.status(500).json(err.message);
      }
  })


// Get Event By Id
const GetEventById = asyncHandler(async (req, res)=>{
    try {
        const event = await Event.findById(req.params.id).populate("clientId").populate("categoryId").populate("serviceId");
        res.status(200).json(event);
      } catch (err) {
        if(err.kind == 'ObjectId'){
            return res.status(400).json({msg: 'Event Id not found'});
             }
            res.status(500).json(err.message);
      }
  });

// Delete Event
const DeleteEvent = asyncHandler(async (req, res)=>{
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json('Category not found');
    }

    const updated = await Event.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.status(201).json(updated);
    
  } catch (error) {
    if(error.kind == 'ObjectId'){
      return res.status(400).json({msg: 'Event Id not found'});
       }
    res.status(404).json({ message: error.message });
  }
});

module.exports = {
  CreateEvent,
  UpdateEvent,
  GetAllEvents,
  GetEventById,
  DeleteEvent,
  GetBookedEvents,
  GetApprovedEvents,
  GetCanceledEvents
}