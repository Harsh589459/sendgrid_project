const {
  getSubscriptionGroups,
  getGroupDetails
} = require("../services/sendgridService")


exports.fetchGroups = async (req, res) => {

  try {

    const onBehalfOf = req.headers["on-behalf-of"]
    const data = await getSubscriptionGroups(onBehalfOf)
    res.json(data)
  } catch (err) {
    console.log('harsherror',err)
    res.status(500).json({ error: "Failed to fetch subscription groups" })
  }
}

exports.fetchGroupStatus = async (req, res) => {

  try {
    const { groupId } = req.body
    const onBehalfOf = req.headers["on-behalf-of"]

    const data = await getGroupDetails(groupId, onBehalfOf)
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch group status" })
  }
}
