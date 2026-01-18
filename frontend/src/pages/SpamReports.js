import { useState } from "react"
import axios from "axios"
import OnBehalfSearch from "../components/OnBehalfSearch"
import API_BASE_URL from "../config/api"

function SpamReport() {
  const [email, setEmail] = useState("")
  const [onBehalfOf, setOnBehalfOf] = useState("")
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleCheck = async () => {
    if (!email || !onBehalfOf) {
      alert("Please enter email and select on-behalf-of")
      return
    }

    try {
      setLoading(true)

      const res = await axios.post(
        `${API_BASE_URL}/sendgrid/spam-report`,
        { email },
        {
          headers: {
            "on-behalf-of": onBehalfOf
          }
        }
      )

      setResult(res.data)
    } catch (err) {
      alert("Error checking spam report status")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: 40 }}>
      <h2>Spam Report Check</h2>

      {/* Email input */}
      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: 400, padding: 10 }}
      />

      <br /><br />

      {/* On-Behalf-Of autocomplete */}
      <OnBehalfSearch onSelect={setOnBehalfOf} />

      <br /><br />

      {/* Submit */}
      <button onClick={handleCheck}>
        {loading ? "Checking..." : "Check Spam Report"}
      </button>

      {/* Result */}
      {result && (
        <pre style={{ marginTop: 20 }}>
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  )
}

export default SpamReport