const express = require('express');
const  {
  CreateService,
  UpdateService,
  GetAllServices,
  DeleteService,
} = require('../controllers/services');

const router = express.Router();

const {adminRole} = require('../middlewares/roles')
const {protect} = require('../middlewares/verifyToken')


// Create Service
router.post("/",protect,adminRole, CreateService);

//update Service 
router.put("/service/:id",protect,adminRole, UpdateService);

//get all Services
router.get("/", GetAllServices);

//delete Service
router.put("/service/:id",protect,adminRole, DeleteService);



module.exports = router