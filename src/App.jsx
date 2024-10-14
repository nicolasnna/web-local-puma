import Navbar from "@components/Navbar"
import Notification from "@components/Notification"
import useRos from "@hooks/useRos"
import Dashboard from "@pages/Dashboard/Dashboard"
import Manual from "@pages/Manual/Manual"
import { useEffect } from "react"
import { Route, Routes } from "react-router-dom"
import Autonomous from "./pages/Autonomous/Autonomous"

function App() {
  const rosManager = useRos()

  useEffect(() => {
    rosManager.openConnection()
  }, [])

  return (
    <div>
      <Navbar />
      <Notification />
      <div style={{ padding: "1rem 0.5rem", width: "95vw" }}>
        <Routes>
          <Route path="/" element={<Dashboard rosInstance={rosManager} />} />
          <Route path="/manual" element={<Manual rosInstance={rosManager} />} />
          <Route
            path="/autonomous"
            element={<Autonomous rosInstance={rosManager} />}
          />
        </Routes>
      </div>
    </div>
  )
}

export default App
