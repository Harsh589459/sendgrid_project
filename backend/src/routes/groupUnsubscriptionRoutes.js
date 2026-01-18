const express = require("express")
const router = express.Router()
const {
  checkGroupUnsubscribers
} = require("../controllers/groupUnsubscribeController")

router.post("/group-unsubscriber", checkGroupUnsubscribers)

console.log("testing")
module.exports = router
