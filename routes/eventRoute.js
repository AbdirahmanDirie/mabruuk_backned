const express = require('express');

const  {
    EventsREport,
    EventsReportToday,
    EventsReportYesterday,
    EventsReportLastWeek,
    EventsReportThisMonth,
    EventsReportLastMonth,
    EventsReportLast30Days,
    EventsReportLastYear,
    EventsReportThisYear
} = require('../controllers/eventReports');

const router = express.Router();

const {protect} = require('../middlewares/verifyToken')


// Users Report
router
.get("/event",protect, EventsREport)
.get("/events/today",protect, EventsReportToday)
.get("/events/yesterday",protect, EventsReportYesterday)
.get("/events/lastweek",protect, EventsReportLastWeek)
.get("/events/thismonth",protect, EventsReportThisMonth)
.get("/events/lastmonth",protect, EventsReportLastMonth)
.get("/events/last30days",protect, EventsReportLast30Days)
.get("/events/lastyear",protect, EventsReportLastYear)
.get("/events/thisyear",protect, EventsReportThisYear)

module.exports = router