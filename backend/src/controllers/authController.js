const googleClient = require("../config/google")
const allowedEmails = require("../data/allowedEmails")

exports.googleLogin = async (req, res) => {
  const { token } = req.body

  try {
    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID
    })

    const payload = ticket.getPayload()
    console.log("payload",payload)
    const email = payload.email

    if (!payload.email_verified) {
      return res.status(403).json({ message: "Email not verified" })
    }

    if (!allowedEmails.includes(email)) {
      return res.status(403).json({ message: "Access denied" })
    }

    res.json({
      message: "Login successful",
      email,
      name: payload.name
    })

  } catch (err) {
    res.status(401).json({ message: "Invalid token" })
  }
}
