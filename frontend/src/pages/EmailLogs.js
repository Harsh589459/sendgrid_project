import { useState } from "react"
import axios from "axios"

function EmailLogs() {
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [limit, setLimit] = useState(10)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleCheck = async () => {
    if (!email || !subject) {
      alert("Please fill all fields")
      return
    }

    try {
      setLoading(true)

      const res = await axios.post(
        "http://localhost:5000/sendgrid/logs",
        { email, subject, limit }
      )

      setResult(res.data)
    } catch (err) {
      alert("Error fetching email logs")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.container}>
      <h2>Email Logs</h2>

      <div style={styles.card}>
        <input
          type="email"
          placeholder="To Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          style={styles.input}
        />

        <select
          value={limit}
          onChange={(e) => setLimit(Number(e.target.value))}
          style={styles.input}
        >
          {Array.from({ length: 100 }, (_, i) => i + 1).map(num => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>

        <button onClick={handleCheck} style={styles.button}>
          {loading ? "Fetching..." : "Get Email Logs"}
        </button>

        {result && (
          <pre style={styles.result}>
            {JSON.stringify(result, null, 2)}
          </pre>
        )}
      </div>
    </div>
  )
}

const styles = {
  container: {
    padding: 40
  },
  card: {
    width: 500,
    padding: 20,
    background: "#f9f9f9",
    borderRadius: 8
  },
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 10
  },
  button: {
    width: "100%",
    padding: 10,
    cursor: "pointer"
  },
  result: {
    marginTop: 20,
    background: "#eee",
    padding: 10,
    borderRadius: 5,
    fontSize: 12
  }
}

export default EmailLogs
