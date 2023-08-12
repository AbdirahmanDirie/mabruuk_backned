const asyncHandler = require("express-async-handler");
const {Event} = require("../models/event");
const moment = require('moment');



//rpoerts between two dates
const EventsREport = asyncHandler(async (req, res)=>{
   
    try {
        // this report two dates between the start and end
            const Events = await Event.find({
                createdAt: {
                    $gte: req.query.start,
                    $lt: req.query.end
                }}).select('-password').sort({createdAt: -1}).populate("clientId").populate("categoryId").populate("serviceId");

                res.status(200).json(Events);
                  
      } catch (err) {
            res.status(500).json(err.message);
      }
  });


//Today reports of Events
  const EventsReportToday = asyncHandler(async (req, res)=>{
    try {
        
        //Today report of Events
        const today = new Date();
        today.setHours(0, 0, 0, 0); // set time to 00:00:00:0000

        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);


        const Events = await Event.find({
            createdAt: {
              $gte: today,
              $lt: tomorrow
            }
          }).select('-password').sort({createdAt: -1}).populate("categoryId").populate("serviceId").populate("clientId");

                // const totalEvents = Events.length;

                res.status(200).json(Events);
    } catch (err) {
        res.status(500).json(err.message);
    }
  });


//   Yesterday report of Events
  const EventsReportYesterday = asyncHandler(async (req, res)=>{
    try {
        
        //Yesterday report of Events
        const start = new Date();
        start.setDate(start.getDate() - 1);
        start.setHours(0, 0, 0, 0);

        const end = new Date();
        end.setDate(end.getDate() - 1);
        end.setHours(23, 59, 59, 999);


        const Events = await Event.find({ createdAt: { $gte: start, $lt: end } }).select('-password').sort({createdAt: -1}).populate("clientId").populate("categoryId").populate("serviceId")

                // const totalEvents = Events.length;

                res.status(200).json(Events);
    } catch (err) {
        res.status(500).json(err.message);
    }
  });

  //Last week Events report
  const EventsReportLastWeek = asyncHandler(async (req, res)=>{
    try {
        
        //last week report of Events
        const startOfWeek = moment().startOf('week');


        const Events = await Event.find({
            createdAt: { 
            $gte: startOfWeek.toDate(), 
            $lt: moment().toDate() }
          }).select('-password').sort({createdAt: -1}).populate("clientId").populate("categoryId").populate("serviceId");



            // const totalEvents = Events.length;

                res.status(200).json(Events);

    } catch (err) {
        res.status(500).json(err.message);
    }
  });

  //This Month Events report
  const EventsReportThisMonth = asyncHandler(async (req, res)=>{
    try {
        
        // Generate report for current month
        const startOfMonth = moment().startOf('month').toDate();
        const endOfMonth = moment().endOf('month').toDate();


        const Events = await Event.find({createdAt: { $gte: startOfMonth, $lte: endOfMonth }}).select('-password').sort({createdAt: -1}).populate("clientId").populate("categoryId").populate("serviceId");



            // const totalEvents = Events.length;

            res.status(200).json(Events);

    } catch (err) {
        res.status(500).json(err.message);
    }
  });

    //last Month Events report
    const EventsReportLastMonth = asyncHandler(async (req, res)=>{
        try {
            
            // Generate report for last month
            const startOfMonth = moment().subtract(1, 'month').startOf('month').toDate();
            const endOfMonth = moment().subtract(1, 'month').endOf('month').toDate();

            const Events = await Event.find({createdAt:  {
                $gte: startOfMonth,
                $lte: endOfMonth
              }}).select('-password').sort({createdAt: -1}).populate("clientId").populate("categoryId").populate("serviceId");
    
    
                // const totalEvents = Events.length;
    
                res.status(200).json(Events);
    
        } catch (err) {
            res.status(500).json(err.message);
        }
      });

    //last 30 days  Events report
    const EventsReportLast30Days = asyncHandler(async (req, res)=>{
        try {
            
            // Get the date 30 days ago from the current date
            const last30Days = new Date();
            last30Days.setDate(last30Days.getDate() - 30); 

            const Events = await Event.find({createdAt:  {$gte: last30Days.toISOString()}}).select('-password').sort({createdAt: -1}).populate("clientId").populate("categoryId").populate("serviceId");
    
    
                // const totalEvents = Events.length;
    
                res.status(200).json(Events);
    
        } catch (err) {
            res.status(500).json(err.message);
        }
      });
      
    //last year Events report
    const EventsReportLastYear = asyncHandler(async (req, res)=>{
        try {
            
            // Get the last year
            const lastYear = new Date().getFullYear() - 1;
            const startDate = new Date(lastYear, 0, 1);
            const endDate = new Date(lastYear, 11, 31); 

            const Events = await Event.find({createdAt:  {
                $gte: startDate,
                $lte: endDate
            }}).select('-password').sort({createdAt: -1}).populate("clientId").populate("categoryId").populate("serviceId");
    
    
                // const totalEvents = Events.length;
    
                    res.status(200).json(Events);
    
        } catch (err) {
            res.status(500).json(err.message);
        }
      });

    //This year Events report
    const EventsReportThisYear = asyncHandler(async (req, res)=>{
        try {
            
            // Get the curent year
            const currentYear = moment().year();

            const Events = await Event.find({ createdAt: { $gte: new Date(currentYear, 0, 1), $lt: new Date(currentYear, 12, 1) } }).select('-password').sort({createdAt: -1}).populate("clientId").populate("categoryId").populate("serviceId");
    
    
                // const totalEvents = Events.length;
    
                res.status(200).json(Events);
        } catch (err) {
            res.status(500).json(err.message);
        }
      });



  module.exports = {
    EventsREport,
    EventsReportToday,
    EventsReportYesterday,
    EventsReportLastWeek,
    EventsReportThisMonth,
    EventsReportLastMonth,
    EventsReportLast30Days,
    EventsReportLastYear,
    EventsReportThisYear
  }