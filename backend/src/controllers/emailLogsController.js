const client = require("@sendgrid/client")
client.setApiKey(process.env.SENDGRID_API_KEY)

exports.getEmailLogs = async (req, res) => {
  const { email, subject, limit } = req.body

  if (!email || !subject) {
    return res.status(400).json({
      message: "Email and subject are required"
    })
  }
// https://www.twilio.com/docs/sendgrid/api-reference/email-activity/filter-all-messages
  const finalLimit = limit || 10

  try {
    const query = `to_email="${email}" AND subject="${subject}"`

    const request = {
      url: "/v3/messages",
      method: "GET",
      qs: {
        query,
        limit: finalLimit
      }
    }

    const [response, body] = await client.request(request)

    res.json({
      statusCode: response.statusCode,
      data: body
    })
  } catch (error) {
    res.status(500).json({
      message: "Error fetching email logs",
      error: error.response?.body || error.message
    })
  }
}
