const express = require("express")
const router = express.Router()
const { getEmailLogs } = require("../controllers/emailLogsController")

router.post("/logs", getEmailLogs)

module.exports = router