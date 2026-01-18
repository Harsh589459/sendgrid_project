const express = require("express")
const cors = require("cors")

const authRoutes = require("./routes/authRoutes")
const sendgridRoutes = require("./routes/sendgridRoutes")
const emailLogsRoutes = require("./routes/emailLogsRoutes")
const blockRoutes = require("./routes/blockRoutes")
const invalidEmailRoutes = require("./routes/invalidEmailRoutes")
const spamReportRoutes = require("./routes/spamReportRoutes")
const globalSuppressionRoutes = require("./routes/globalSuppressionRoutes")
const subscriptionGroupRoutes = require("./routes/subscriptionGroupRoutes")
const groupUnsubscribers = require("./routes/groupUnsubscriptionRoutes")






const app = express()

app.use(cors())
app.use(express.json())

app.use("/auth", authRoutes)
app.use("/sendgrid", sendgridRoutes)
app.use("/sendgrid", emailLogsRoutes)
app.use("/sendgrid", blockRoutes)
app.use("/sendgrid", invalidEmailRoutes)
app.use("/sendgrid", spamReportRoutes)
app.use("/sendgrid", globalSuppressionRoutes)
app.use("/sendgrid", subscriptionGroupRoutes)
app.use("/sendgrid",groupUnsubscribers)







// Dummy API
app.get("/api/data", (req, res) => {
  res.json({
    message: "This data is coming from backend",
    date: new Date().toLocaleString()
  })
})

module.exports = app
