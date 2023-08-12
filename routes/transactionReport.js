const express = require('express');

const  {
    TransactionReport,
    TransactionReportToday,
    TransactionReportYesterday,
    TransactionReportLastWeek,
    TransactionReportThisMonth,
    TransactionReportLastMonth,
    TransactionReportLast30Days,
    TransactionReportLastYear,
    TransactionReportThisYear
} = require('../controllers/transactionReport');

const router = express.Router();

const {protect} = require('../middlewares/verifyToken')


// Users Report
router
.get("/transaction",protect, TransactionReport)
.get("/transaction/today",protect, TransactionReportToday)
.get("/transaction/yesterday",protect, TransactionReportYesterday)
.get("/transaction/lastweek",protect, TransactionReportLastWeek)
.get("/transaction/thismonth",protect, TransactionReportThisMonth)
.get("/transaction/lastmonth",protect, TransactionReportLastMonth)
.get("/transaction/last30days",protect, TransactionReportLast30Days)
.get("/transaction/lastyear",protect, TransactionReportLastYear)
.get("/transaction/thisyear",protect, TransactionReportThisYear)

module.exports = router