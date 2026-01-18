

import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { GoogleOAuthProvider } from "@react-oauth/google"
import { BrowserRouter } from "react-router-dom"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <GoogleOAuthProvider clientId="1037535795022-kmbaoekd9o860ejmhgtj7mc77koq7i6h.apps.googleusercontent.com">
      <BrowserRouter>
      <App />
    </BrowserRouter>
  </GoogleOAuthProvider>
)
