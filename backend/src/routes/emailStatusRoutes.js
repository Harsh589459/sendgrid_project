const express = require("express")
const router = express.Router()
const { checkEmailStatus } = require("../controllers/emailStatusController")

router.post("/email-status", checkEmailStatus)

module.exports = router
