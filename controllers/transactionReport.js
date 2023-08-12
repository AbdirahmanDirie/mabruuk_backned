const asyncHandler = require("express-async-handler");
const IncomeExpense = require('../models/transaction');
const moment = require('moment');



//rpoerts between two dates
const TransactionReport = asyncHandler(async (req, res)=>{
   
    try {

        // this report two dates between the start and end
            const Transaction = await IncomeExpense.find(
                  { createdAt: {
                    $gte: req.query.start,
                    $lt: req.query.end
                  }}
                ).sort({createdAt: -1});

                res.status(200).json(Transaction);
                  
      } catch (err) {
            res.status(500).json(err.message);
      }
  });


//Today reports of Transaction
  const TransactionReportToday = asyncHandler(async (req, res)=>{
    try {
        
        //Today report of Transaction
        const today = new Date();
        today.setHours(0, 0, 0, 0); // set time to 00:00:00:0000

        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);


        const Transaction = await IncomeExpense.find({
            createdAt: {
              $gte: today,
              $lt: tomorrow
            }
          }).sort({createdAt: -1});

                // const totalTransaction = Transaction.length;

                // const totalAmount = Transaction.reduce((acc, curr) => acc + curr.amount, 0);
                // res.status(200).json({Transaction, totalAmount});
                res.status(200).json(Transaction);
    } catch (err) {
        res.status(500).json(err.message);
    }
  });


//   Yesterday report of Transaction
  const TransactionReportYesterday = asyncHandler(async (req, res)=>{
    try {
        
        //Yesterday report of Transaction
        const start = new Date();
        start.setDate(start.getDate() - 1);
        start.setHours(0, 0, 0, 0);

        const end = new Date();
        end.setDate(end.getDate() - 1);
        end.setHours(23, 59, 59, 999);


        const Transaction = await IncomeExpense.find({ createdAt: { $gte: start, $lt: end } }).sort({createdAt: -1});

        // const totalAmount = Transaction.reduce((acc, curr) => acc + curr.amount, 0);

                // const totalTransaction = Transaction.length;

                res.status(200).json(Transaction);
    } catch (err) {
        res.status(500).json(err.message);
    }
  });

  //Last week Transaction report
  const TransactionReportLastWeek = asyncHandler(async (req, res)=>{
    try {
        
        //last week report of Transaction
        const startOfWeek = moment().startOf('week');


        const Transaction = await IncomeExpense.find({
            createdAt: { 
            $gte: startOfWeek.toDate(), 
            $lt: moment().toDate() }
          }).sort({createdAt: -1});
          
          // const totalAmount = Transaction.reduce((acc, curr) => acc + curr.amount, 0);
          //       res.status(200).json({Transaction, totalAmount});
          res.status(200).json(Transaction);
    } catch (err) {
        res.status(500).json(err.message);
    }
  });

  //This Month Transaction report
  const TransactionReportThisMonth = asyncHandler(async (req, res)=>{
    try {
        
        // Generate report for current month
        const startOfMonth = moment().startOf('month').toDate();
        const endOfMonth = moment().endOf('month').toDate();


        const Transaction = await IncomeExpense.find({createdAt: { $gte: startOfMonth, $lte: endOfMonth }}).sort({createdAt: -1});
        



        // const totalAmount = Transaction.reduce((acc, curr) => acc + curr.amount, 0);
        // res.status(200).json({Transaction, totalAmount});
        res.status(200).json(Transaction);

    } catch (err) {
        res.status(500).json(err.message);
    }
  });

    //last Month Transaction report
    const TransactionReportLastMonth = asyncHandler(async (req, res)=>{
        try {
            
            // Generate report for last month
            const startOfMonth = moment().subtract(1, 'month').startOf('month').toDate();
            const endOfMonth = moment().subtract(1, 'month').endOf('month').toDate();

            const Transaction = await IncomeExpense.find({createdAt:  {
                $gte: startOfMonth,
                $lte: endOfMonth
              }}).sort({createdAt: -1});
              
    
    
              // const totalAmount = Transaction.reduce((acc, curr) => acc + curr.amount, 0);
              // res.status(200).json({Transaction, totalAmount});

              res.status(200).json(Transaction);
    
        } catch (err) {
            res.status(500).json(err.message);
        }
      });

    //last 30 days  Transaction report
    const TransactionReportLast30Days = asyncHandler(async (req, res)=>{
        try {
            
            // Get the date 30 days ago from the current date
            const last30Days = new Date();
            last30Days.setDate(last30Days.getDate() - 30); 

            const Transaction = await IncomeExpense.find({createdAt:  {$gte: last30Days.toISOString()}}).sort({createdAt: -1});
            
    
    
            // const totalAmount = Transaction.reduce((acc, curr) => acc + curr.amount, 0);
            // res.status(200).json({Transaction, totalAmount});
            res.status(200).json(Transaction);
    
        } catch (err) {
            res.status(500).json(err.msg);
        }
      });
      
    //last year Transaction report
    const TransactionReportLastYear = asyncHandler(async (req, res)=>{
        try {
            
            // Get the last year
            const lastYear = new Date().getFullYear() - 1;
            const startDate = new Date(lastYear, 0, 1);
            const endDate = new Date(lastYear, 11, 31); 

            const Transaction = await IncomeExpense.find({createdAt:  {
                $gte: startDate,
                $lte: endDate
            }}).sort({createdAt: -1});
            
    
    
            // const totalAmount = Transaction.reduce((acc, curr) => acc + curr.amount, 0);
            // res.status(200).json({Transaction, totalAmount});
            res.status(200).json(Transaction);
        } catch (err) {
            res.status(500).json(err.message);
        }
      });

    //This year Transaction report
    const TransactionReportThisYear = asyncHandler(async (req, res)=>{
        try {
            
            // Get the curent year
            const currentYear = moment().year();

            const Transaction = await IncomeExpense.find({ createdAt: { $gte: new Date(currentYear, 0, 1), $lt: new Date(currentYear, 12, 1) } }).sort({createdAt: -1});
            
    
    
            // const totalAmount = Transaction.reduce((acc, curr) => acc + curr.amount, 0);
            // res.status(200).json({Transaction, totalAmount});
    
                res.status(200).json(Transaction);
        } catch (err) {
            res.status(500).json(err.message);
        }
      });



  module.exports = {
    TransactionReport,
    TransactionReportToday,
    TransactionReportYesterday,
    TransactionReportLastWeek,
    TransactionReportThisMonth,
    TransactionReportLastMonth,
    TransactionReportLast30Days,
    TransactionReportLastYear,
    TransactionReportThisYear
  }