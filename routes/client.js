const express = require('express');

const  {
  CreateClient,
  UpdateClient,
  GetAllClients,
  DeleteClient,
  searchClient
} = require('../controllers/client');

const router = express.Router();

const {adminRole} = require('../middlewares/roles')
const {protect} = require('../middlewares/verifyToken')

// Create Client
router.post("/", CreateClient);

//update Client 
router.put("/cllient/:id",protect,adminRole, UpdateClient);

//get all Clients
router.get("/", GetAllClients);

//search Clients
router.get("/search", searchClient);

//delete Client
router.put("/client/:id",protect,adminRole, DeleteClient);

module.exports = router