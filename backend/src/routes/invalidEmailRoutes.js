const express = require("express")
const router = express.Router()
const { checkInvalidEmailStatus } = require("../controllers/invalidEmailController")

router.post("/invalid-email", checkInvalidEmailStatus)

module.exports = router
