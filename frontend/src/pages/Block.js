import { useState } from "react"
import axios from "axios"
import OnBehalfSearch from "../components/OnBehalfSearch"
import API_BASE_URL from "../config/api"


function Block() {
  const [email, setEmail] = useState("")
  const [onBehalfOf, setOnBehalfOf] = useState("")
  const [result, setResult] = useState(null)

  const handleCheck = async () => {
    const res = await axios.post(
      `${API_BASE_URL}/sendgrid/block`,
      { email },
      {
        headers: {
          "on-behalf-of": onBehalfOf
        }
      }
    )

    setResult(res.data)
  }

  return (
    <div style={{ padding: 40 }}>
      <h2>Block Check</h2>

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

      <button onClick={handleCheck}>Check Block</button>

      {result && (
        <pre style={{ marginTop: 20 }}>
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  )
}

export default Block
