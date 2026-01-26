const axios = require("axios")

const SENDGRID_BASE_URL = "https://api.sendgrid.com/v3"

const callSendGrid = async (url, apiKey, onBehalfOf) => {
  try {
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "on-behalf-of": onBehalfOf
      }
    })
    return res.data
  } catch (err) {
    if (err.response && err.response.status === 404) {
      return { status: "not_found" }
    }
    return { error: true, message: err.message }
  }
}

exports.checkEmailStatus = async (req, res) => {
  const { email } = req.body
  const onBehalfOf = req.headers["on-behalf-of"]

  if (!email || !onBehalfOf) {
    return res.status(400).json({ message: "Email and on-behalf-of required" })
  }

  const apiKey = process.env.SENDGRID_API_KEY
  const encodedEmail = encodeURIComponent(email)

  try {
    const [
      bounce,
      block,
      invalid,
      globalSuppression,
      spamReport,
      groupUnsubscribe
    ] = await Promise.all([
      callSendGrid(`${SENDGRID_BASE_URL}/suppression/bounces/${encodedEmail}`, apiKey, onBehalfOf),
      callSendGrid(`${SENDGRID_BASE_URL}/suppression/blocks/${encodedEmail}`, apiKey, onBehalfOf),
      callSendGrid(`${SENDGRID_BASE_URL}/suppression/invalid_emails/${encodedEmail}`, apiKey, onBehalfOf),
      callSendGrid(`${SENDGRID_BASE_URL}/asm/suppressions/global/${encodedEmail}`, apiKey, onBehalfOf),
      callSendGrid(`${SENDGRID_BASE_URL}/suppression/spam_reports/${encodedEmail}`, apiKey, onBehalfOf),
      callSendGrid(`${SENDGRID_BASE_URL}/asm/suppressions/${encodedEmail}`, apiKey, onBehalfOf)
    ])

    res.json({
      email,
      onBehalfOf,
      results: {
        bounce,
        block,
        invalid,
        globalSuppression,
        spamReport,
        groupUnsubscribe
      }
    })
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch email status" })
  }
}
