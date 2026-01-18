const express = require("express")
const router = express.Router()
const { checkBounceStatus } = require("../controllers/Bounce")

router.post("/bounce", checkBounceStatus)

module.exports = router
