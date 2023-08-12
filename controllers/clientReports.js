const asyncHandler = require("express-async-handler");
const {Client} = require("../models/client");
const {Event} = require("../models/event");
const moment = require('moment');



//rpoerts between two dates
const ClientsREport = asyncHandler(async (req, res)=>{
   
    try {
        // this report two dates between the start and end
            const clients = await Client.find({
                createdAt: {
                    $gte: req.query.start,
                    $lt: req.query.end
                }}).select('-password').sort({createdAt: -1});

                res.status(200).json(clients);
      } catch (err) {
            res.status(500).json(err.message);
      }
  });


//Today reports of clients
  const ClientsReportToday = asyncHandler(async (req, res)=>{
    try {
        
        //Today report of clients
        const today = new Date();
        today.setHours(0, 0, 0, 0); // set time to 00:00:00:0000

        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);


        const clients = await Client.find({
            createdAt: {
              $gte: today,
              $lt: tomorrow
            }
          }).select('-password').sort({createdAt: -1});

                // const totalClients = clients.length;

                res.status(200).json(clients);
    } catch (err) {
        res.status(500).json(err.message);
    }
  });


//   Yesterday report of clients
  const ClientsReportYesterday = asyncHandler(async (req, res)=>{
    try {
        
        //Yesterday report of clients
        const start = new Date();
        start.setDate(start.getDate() - 1);
        start.setHours(0, 0, 0, 0);

        const end = new Date();
        end.setDate(end.getDate() - 1);
        end.setHours(23, 59, 59, 999);


        const clients = await Client.find({ createdAt: { $gte: start, $lt: end } }).select('-password').sort({createdAt: -1});

                // const totalClients = clients.length;

                res.status(200).json(clients);
    } catch (err) {
        res.status(500).json(err.message);
    }
  });

  //Last week clients report
  const ClientsReportLastWeek = asyncHandler(async (req, res)=>{
    try {
        
        //last week report of clients
        const startOfWeek = moment().startOf('week');


        const clients = await Client.find({
            createdAt: { 
            $gte: startOfWeek.toDate(), 
            $lt: moment().toDate() }
          }).select('-password').sort({createdAt: -1});


            // const totalClients = clients.length;

                res.status(200).json(clients);

    } catch (err) {
        res.status(500).json(err.message);
    }
  });

  //This Month clients report
  const ClientsReportThisMonth = asyncHandler(async (req, res)=>{
    try {
        
        // Generate report for current month
        const startOfMonth = moment().startOf('month').toDate();
        const endOfMonth = moment().endOf('month').toDate();


        const clients = await Client.find({createdAt: { $gte: startOfMonth, $lte: endOfMonth }}).select('-password').sort({createdAt: -1});


            // const totalClients = clients.length;

            res.status(200).json(clients);

    } catch (err) {
        res.status(500).json(err.message);
    }
  });

    //last Month clients report
    const ClientsReportLastMonth = asyncHandler(async (req, res)=>{
        try {
            
            // Generate report for last month
            const startOfMonth = moment().subtract(1, 'month').startOf('month').toDate();
            const endOfMonth = moment().subtract(1, 'month').endOf('month').toDate();

            const clients = await Client.find({createdAt:  {
                $gte: startOfMonth,
                $lte: endOfMonth
              }}).select('-password').sort({createdAt: -1});
    
    
                // const totalClients = clients.length;
    
                res.status(200).json(clients);
    
        } catch (err) {
            res.status(500).json(err.message);
        }
      });

    //last 30 days  clients report
    const ClientsReportLast30Days = asyncHandler(async (req, res)=>{
        try {
            
            // Get the date 30 days ago from the current date
            const last30Days = new Date();
            last30Days.setDate(last30Days.getDate() - 30); 

            const clients = await Client.find({createdAt:  {$gte: last30Days.toISOString()}}).select('-password').sort({createdAt: -1});
    
    
                // const totalClients = clients.length;
    
                res.status(200).json(clients);
    
        } catch (err) {
            res.status(500).json(err.message);
        }
      });
      
    //last year clients report
    const ClientsReportLastYear = asyncHandler(async (req, res)=>{
        try {
            
            // Get the last year
            const lastYear = new Date().getFullYear() - 1;
            const startDate = new Date(lastYear, 0, 1);
            const endDate = new Date(lastYear, 11, 31); 

            const clients = await Client.find({createdAt:  {
                $gte: startDate,
                $lte: endDate
            }}).select('-password').sort({createdAt: -1});
    
    
                // const totalClients = clients.length;
    
                    res.status(200).json(clients);
    
        } catch (err) {
            res.status(500).json(err.message);
        }
      });

    //This year clients report
    const ClientsReportThisYear = asyncHandler(async (req, res)=>{
        try {
            
            // Get the curent year
            const currentYear = moment().year();

            const clients = await Client.find({ createdAt: { $gte: new Date(currentYear, 0, 1), $lt: new Date(currentYear, 12, 1) } }).select('-password').sort({createdAt: -1});
    
    
                // const totalClients = clients.length;
    
                res.status(200).json(clients);
        } catch (err) {
            res.status(500).json(err.message);
        }
      });



  module.exports = {
    ClientsREport,
    ClientsReportToday,
    ClientsReportYesterday,
    ClientsReportLastWeek,
    ClientsReportThisMonth,
    ClientsReportLastMonth,
    ClientsReportLast30Days,
    ClientsReportLastYear,
    ClientsReportThisYear
  }