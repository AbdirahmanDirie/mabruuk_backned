const express = require('express');

const  {
  UsersREport,
  UsersReportToday,
  UsersReportYesterday,
  UsersReportLastWeek,
  UsersReportThisMonth,
  UsersReportLastMonth,
  UsersReportLast30Days,
  UsersReportLastYear,
  UsersReportThisYear
} = require('../controllers/userReports');

const router = express.Router();

const {protect} = require('../middlewares/verifyToken')


// Users Report
router
.get("/user",protect, UsersREport)
.get("/users/today",protect, UsersReportToday)
.get("/users/yesterday",protect, UsersReportYesterday)
.get("/users/lastweek",protect, UsersReportLastWeek)
.get("/users/thismonth",protect, UsersReportThisMonth)
.get("/users/lastmonth",protect, UsersReportLastMonth)
.get("/users/last30days",protect, UsersReportLast30Days)
.get("/users/lastyear",protect, UsersReportLastYear)
.get("/users/thisyear",protect, UsersReportThisYear)

module.exports = router