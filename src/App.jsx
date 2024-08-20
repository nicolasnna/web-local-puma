import { useEffect } from "react"
import { Route, Routes } from "react-router-dom"
import Navbar from "@components/Navbar"
import useRos from "@hooks/useRos"
import Dashboard from "@pages/Dashboard/Dashboard"
import Manual from "@pages/Manual/Manual"

function App() {
  const rosManager = useRos()

  useEffect(()=> {
    rosManager.openConnection()
  },[])

  return (
    <>
      <Navbar/>
      <div style={{padding:'1em 2em'}} >
        <Routes>
          <Route path="/" element={<Dashboard rosInstance={rosManager}/>}/>
          <Route path="/manual" element={<Manual rosInstance={rosManager}/>}/>
        </Routes>
      </div>
    </>
  )
}

export default App
