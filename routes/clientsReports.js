const express = require('express');

const  {
    ClientsREport,
    ClientsReportToday,
    ClientsReportYesterday,
    ClientsReportLastWeek,
    ClientsReportThisMonth,
    ClientsReportLastMonth,
    ClientsReportLast30Days,
    ClientsReportLastYear,
    ClientsReportThisYear
} = require('../controllers/clientReports');

const router = express.Router();

const {protect} = require('../middlewares/verifyToken')


// Users Report
router
.get("/client",protect, ClientsREport)
.get("/clients/today",protect, ClientsReportToday)
.get("/clients/yesterday",protect, ClientsReportYesterday)
.get("/clients/lastweek",protect, ClientsReportLastWeek)
.get("/clients/thismonth",protect, ClientsReportThisMonth)
.get("/clients/lastmonth",protect, ClientsReportLastMonth)
.get("/clients/last30days",protect, ClientsReportLast30Days)
.get("/clients/lastyear",protect, ClientsReportLastYear)
.get("/clients/thisyear",protect, ClientsReportThisYear)

module.exports = router