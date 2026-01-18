const express = require("express")
const router = express.Router()
const { checkSpamReportStatus } = require("../controllers/spamReportController")

router.post("/spam-report", checkSpamReportStatus)

module.exports = router
