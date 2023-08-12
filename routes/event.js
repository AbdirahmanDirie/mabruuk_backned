const express = require('express');

const  {
  CreateEvent,
  UpdateEvent,
  GetAllEvents,
  GetEventById,
  DeleteEvent,
  GetBookedEvents,
  GetApprovedEvents,
  GetCanceledEvents
} = require('../controllers/event');

const router = express.Router();

const {adminRole} = require('../middlewares/roles')
const {protect} = require('../middlewares/verifyToken')

// Create Event
router.post("/",protect,adminRole, CreateEvent);

//update Event 
router.put("/event/:id",protect,adminRole, UpdateEvent);

//get all Events
router.get("/",protect, GetAllEvents);

//get Event by id
router.get("/event/:id", GetEventById);

//get Booked
router.get("/event/status/Booked",protect, GetBookedEvents);

//get Approved
router.get("/event/status/Approved",protect, GetApprovedEvents);

//get Cancelled
router.get("/event/status/Canceled",protect, GetCanceledEvents);

//delete Event
router.put("/event/:id",protect,adminRole, DeleteEvent);

module.exports = router