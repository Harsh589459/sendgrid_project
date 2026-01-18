const express = require("express")
const router = express.Router()
const {
  checkGlobalSuppression
} = require("../controllers/globalSuppressionController")

router.post("/global-suppression", checkGlobalSuppression)

module.exports = router
