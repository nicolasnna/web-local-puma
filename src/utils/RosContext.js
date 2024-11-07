import { createContext, useContext } from "react"

export const RosContext = createContext(null)
export const useRosContext = () => useContext(RosContext)
