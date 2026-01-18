const client = require("@sendgrid/client")
client.setApiKey(process.env.SENDGRID_API_KEY)

exports.checkGroupUnsubscribers = async (req, res) => {
  const { email } = req.body
  const onBehalfOf = req.headers["on-behalf-of"]

  if (!email || !onBehalfOf) {
    return res.status(400).json({
      message: "Email and on-behalf-of header are required"
    })
  }

  try {
    const request = {
      url: `/v3/asm/suppressions/${encodeURIComponent(email)}`,
      method: "GET",
      headers: {
        "On-Behalf-Of": onBehalfOf
      }
    }

    const [response, body] = await client.request(request)

    res.json({
      statusCode: response.statusCode,
      data: body
    })
  } catch (error) {
    res.status(500).json({
      message: "Error fetching global suppression status",
      error: error.response?.body || error.message
    })
  }
}
