const express = require("express")
const router = express.Router()
const { checkBlockStatus } = require("../controllers/blockController")

router.post("/block", checkBlockStatus)

module.exports = router
