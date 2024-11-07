import ContainerElement from "@components/ContainerElement"
import { GPS_TOPIC } from "@utils/constants"
import PropTypes from "prop-types"
import { useSelector } from "react-redux"
import Map from "./Map"

const MapView = ({
  showPath = false,
  widthMap = "30vw",
  heightMap = "40vh",
  extraClassName,
}) => {
  const { latLon, pathNav, timeUploaded } = useSelector((state) => state.gpsRos)

  const validateLatLon = latLon.length === 0 ? [0, 0] : latLon

  return (
    <ContainerElement
      Title={"Posición global"}
      Topic={GPS_TOPIC}
      currentDate={latLon.length === 0 ? "" : timeUploaded}
      extraClassName={extraClassName}
    >
      <Map
        latLonCenter={validateLatLon}
        pathNav={pathNav}
        showPath={showPath}
        widthMap={widthMap}
        heightMap={heightMap}
      />
    </ContainerElement>
  )
}

MapView.propTypes = {
  showPath: PropTypes.bool,
  widthMap: PropTypes.string,
  heightMap: PropTypes.string,
  extraClassName: PropTypes.string,
}

export default MapView
