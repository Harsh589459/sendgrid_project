const express = require("express")
const router = express.Router()
const controller = require("../controllers/subscriptionController")


router.get("/subscription/groups", controller.fetchGroups)
router.post("/subscription/group-status", controller.fetchGroupStatus)

module.exports = router
