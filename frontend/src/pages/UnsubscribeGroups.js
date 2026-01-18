import { useState } from "react"
import axios from "axios"
import OnBehalfSearch from "../components/OnBehalfSearch"
import API_BASE_URL from "../config/api"

function UnsubscribeGroups() {
  const [onBehalfOf, setOnBehalfOf] = useState("")
  const [groups, setGroups] = useState([])
  const [groupId, setGroupId] = useState("")
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetchGroups = async () => {
    if (!onBehalfOf) {
      alert("Select on-behalf-of account")
      return
    }

    try {
      setLoading(true)
      const res = await axios.get(
        `${API_BASE_URL}/sendgrid/subscription/groups`,
        {
          headers: { "on-behalf-of": onBehalfOf }
        }
      )
      setGroups(res.data)
    } catch {
      alert("Failed to fetch groups")
    } finally {
      setLoading(false)
    }
  }

  const fetchStatus = async () => {
    if (!groupId) {
      alert("Select a subscription group")
      return
    }

    try {
      setLoading(true)
      const res = await axios.post(
        `${API_BASE_URL}/sendgrid/subscription/group-status`,
        { groupId },
        {
          headers: { "on-behalf-of": onBehalfOf }
        }
      )
      setResult(res.data)
    } catch {
      alert("Failed to fetch subscription status")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: 40 }}>
      <h2>Subscription Group Check</h2>

      <OnBehalfSearch onSelect={setOnBehalfOf} />
      <br />

      <button onClick={fetchGroups}>
        {loading ? "Loading..." : "Get Subscription Groups"}
      </button>

      <br /><br />

      {groups.length > 0 && (
        <select
          value={groupId}
          onChange={(e) => setGroupId(e.target.value)}
          style={{ width: 400, padding: 10 }}
        >
          <option value="">Select Subscription Group</option>
          {groups.map((g) => (
            <option key={g.id} value={g.id}>
              {g.name}
            </option>
          ))}
        </select>
      )}

      <br /><br />

      <button onClick={fetchStatus}>
        Get Subscription Status
      </button>

      {result && (
        <pre style={{ marginTop: 20 }}>
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  )
}

export default UnsubscribeGroups;
