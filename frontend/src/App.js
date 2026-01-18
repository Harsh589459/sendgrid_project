import { Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import Bounce from "./pages/Bounce"
import Block from "./pages/Block"
import InvalidEmail from "./pages/InvalidEmail"
import EmailLogs from "./pages/EmailLogs"
import GlobalSuppressions from "./pages/GlobalSuppressions"
import SpamReports from "./pages/SpamReports"
import UnsubscribeGroups from "./pages/UnsubscribeGroups"
import GroupUnsubscribe from "./pages/GroupUnsubscribe"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/bounce" element={<Bounce />} />
      <Route path="/block" element={<Block />} />
      <Route path="/invalid-email" element={<InvalidEmail />} />
      <Route path="/email-logs" element={<EmailLogs />} />
      <Route path="/global-suppression" element={<GlobalSuppressions/>}/>
      <Route path="/spam-reports" element={<SpamReports/>}/>
      <Route path="/unsubscribe-groups" element={<UnsubscribeGroups/>}/>
      <Route path="/group-unsubscribe" element={<GroupUnsubscribe/>}/>



      


    </Routes>
  )
}

export default App
