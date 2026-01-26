const express = require("express")
const cors = require("cors")
const emailStatusRoutes = require("./routes/emailStatusRoutes")

const app = express()

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
    "http://localhost:5174",
  "https://your-frontend.vercel.app"
]

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true)

      if (allowedOrigins.includes(origin)) {
        return callback(null, true)
      }

      return callback(new Error("Not allowed by CORS"))
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "on-behalf-of"
    ]
  })
)

app.use(express.json())


app.use("/sendgrid", emailStatusRoutes)

// Health / test API
app.get("/api/data", (req, res) => {
  res.json({
    message: "This data is coming from backend",
    date: new Date().toLocaleString()
  })
})

module.exports = app
