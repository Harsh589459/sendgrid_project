import { GoogleLogin } from "@react-oauth/google"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import API_BASE_URL from "../config/api"

function Login() {
  const navigate = useNavigate()

  const handleLogin = async (credentialResponse) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/auth/google`, {
        token: credentialResponse.credential
      })

      localStorage.setItem("user", JSON.stringify(res.data))
      navigate("/dashboard")

    } catch (err) {
      alert("Access denied")
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Welcome Back</h2>
        <p style={styles.subtitle}>Login using Google</p>

        <GoogleLogin
          onSuccess={handleLogin}
          onError={() => alert("Login Failed")}
        />
      </div>
    </div>
  )
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #667eea, #764ba2)"
  },
  card: {
    background: "#fff",
    padding: 40,
    borderRadius: 10,
    width: 350,
    textAlign: "center",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
  },
  title: {
    marginBottom: 10
  },
  subtitle: {
    marginBottom: 20,
    color: "#555"
  }
}

export default Login
