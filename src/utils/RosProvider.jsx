import useRos from "@hooks/useRos"
import PropTypes from "prop-types"
import { createContext } from "react"

export const RosContext = createContext(null)

export const RosProvider = ({children}) => {
  const rosManager = useRos()

  return (
    <RosContext.Provider value={rosManager}>
      {children}
    </RosContext.Provider>
  );
}

RosProvider.propTypes = {
  children: PropTypes.element
}