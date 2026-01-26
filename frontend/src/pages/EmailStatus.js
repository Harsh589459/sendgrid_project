import { useState } from "react"
import axios from "axios"
import API_BASE_URL from "../config/api"
import OnBehalfSearch from "../components/OnBehalfSearch"

function EmailStatus() {
  const [email, setEmail] = useState("")
  const [onBehalfOf, setOnBehalfOf] = useState("")
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleCheck = async () => {
    if (!email || !onBehalfOf) {
      alert("Enter email and select account")
      return
    }

    try {
      setLoading(true)

      const res = await axios.post(
        `${API_BASE_URL}/sendgrid/email-status`,
        { email },
        {
          headers: {
            "on-behalf-of": onBehalfOf
          }
        }
      )

      setResult(res.data)

      console.log(res.data)
    } catch {
      alert("Failed to fetch email status")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: 40 }}>
      <h2>Email Status Checker</h2>

      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: 400, padding: 10 }}
      />

      <br /><br />

      <OnBehalfSearch onSelect={setOnBehalfOf} />

      <br /><br />

      <button onClick={handleCheck}>
        {loading ? "Checking..." : "Check Email Status"}
      </button>

      {/* {result && (
        <pre style={{ marginTop: 30 }}>
          {JSON.stringify(result.results, null, 2)}
        </pre>
      )} */}

      {result && (
  <div style={{ marginTop: 30 }}>

    {/* Bounce */}
    <h3>Bounce</h3>
    {result.results.bounce.length === 0 ? (
      <p Style="color:red">User is not in Bounce list</p>
    ) : (
        <p>User is in Bounce List</p>
    )}

    {/* Block */}
    <h3>Block</h3>
    {result.results.block.length === 0 ? (
      <p Style="color:red">User is not in Block list</p>
    ) : (
        <p>User is in Block List</p>
    )}

    {/* Invalid */}
    <h3>Invalid Emails</h3>
    {result.results.invalid.length === 0 ? (
      <p Style="color:red">User is not in invalid email list</p>
    ) : (
        <p>User is in Invalid Email List</p>
    )}

    {/* Global Suppression */}
    <h3>Global Suppression</h3>
    {Object.keys(result.results.globalSuppression).length === 0 ? (
      <p Style="color:red">User is not in global suppression list</p>
    ) : (
        <p>User is in Global Supression List</p>
    )}

    {/* Spam Report */}
    <h3>Spam Report</h3>
    {result.results.spamReport?.error ? (
      <p>Unable to fetch spam report</p>
    ) : result.results.spamReport?.length === 0 ? (
      <p Style="color:red">User is not in spam report list</p>
    ) : (
        <p>User is in spam report List</p>
    )}

    {/* Group Unsubscribe (NO empty logic) */}
    <h3>Group Unsubscribe</h3>
    <pre>{JSON.stringify(result.results.groupUnsubscribe, null, 2)}</pre>

  </div>
)}

      
    </div>
  )
}

export default EmailStatus
