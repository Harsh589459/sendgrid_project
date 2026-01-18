import { useState } from "react"
import subusers from "../data/subusers.json"

function OnBehalfSearch({ value, onSelect }) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState([])

  const handleChange = (e) => {
    const text = e.target.value
    setQuery(text)

    if (!text) {
      setResults([])
      return
    }

    const filtered = subusers.filter((item) =>
      item.username.toLowerCase().includes(text.toLowerCase())
    )

    setResults(filtered)
  }

  const handleSelect = (username) => {
    onSelect(username)
    setQuery(username)
    setResults([])
  }

  return (
    <div style={{ position: "relative", width: 400 }}>
      <input
        type="text"
        placeholder="Search on-behalf-of username"
        value={query}
        onChange={handleChange}
        style={{ width: "100%", padding: 10 }}
      />

      {results.length > 0 && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            border: "1px solid #ccc",
            background: "#fff",
            zIndex: 10
          }}
        >
          {results.map((item) => (
            <div
              key={item.id}
              onClick={() => handleSelect(item.username)}
              style={{
                padding: 10,
                cursor: "pointer",
                borderBottom: "1px solid #eee"
              }}
            >
              {item.username}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default OnBehalfSearch
