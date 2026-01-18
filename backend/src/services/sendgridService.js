const axios = require("axios")

const SENDGRID_BASE_URL = "https://api.sendgrid.com/v3"

const getHeaders = (onBehalfOf) => ({
  Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
  ...(onBehalfOf && { "on-behalf-of": onBehalfOf })
})

exports.getSubscriptionGroups = async (onBehalfOf) => {
  const res = await axios.get(
    `${SENDGRID_BASE_URL}/asm/groups`,
    { headers: getHeaders(onBehalfOf) }
  )
  return res.data
}

exports.getGroupDetails = async (groupId, onBehalfOf) => {
  const res = await axios.get(
    `${SENDGRID_BASE_URL}/asm/groups/${groupId}`,
    { headers: getHeaders(onBehalfOf) }
  )
  return res.data
}
