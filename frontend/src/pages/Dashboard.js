import { useNavigate } from "react-router-dom"
import { useEffect } from "react"




function Dashboard() {

  const navigate = useNavigate()
  useEffect(() => {
  const user = localStorage.getItem("user")
  if (!user) navigate("/")
}, [])

  return (
    <div style={styles.container}>
      <h2>Dashboard</h2>

      <div style={styles.grid}>
        <div style={styles.card} onClick={() => navigate("/bounce")}>
          Bounce List
        </div>

        <div style={styles.card} onClick={() => navigate("/block")}>
          Block
        </div>

        <div style={styles.card} onClick={() => navigate("/invalid-email")}>
          Invalid Email
        </div>

        <div style={styles.card} onClick={() => navigate("/email-logs")}>
          Email Logs
        </div>
         <div style={styles.card} onClick={() => navigate("/global-suppression")}>
          Global Suppressions
        </div>
         <div style={styles.card} onClick={() => navigate("/spam-reports")}>
          Spam Reports
        </div>
          {/* <div style={styles.card} onClick={() => navigate("/unsubscribe-groups")}>
          Unsubscribe Groups
        </div> */}
        <div style={styles.card} onClick={() => navigate("/group-unsubscribe")}>
        Group Unsubscribe
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: {
    padding: 40
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: 20,
    marginTop: 30
  },
  card: {
    padding: 30,
    background: "#f4f4f4",
    borderRadius: 10,
    cursor: "pointer",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
  }
}

export default Dashboard
