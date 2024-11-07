import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { MapContainer, Marker, Polyline, Popup, TileLayer, useMap } from 'react-leaflet'
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { useSelector } from 'react-redux'

const iconRobot  = (rotationAngle) => new L.divIcon({
  html: `<div style="transform: rotate(${rotationAngle}deg)">
          <img src="icon-atv.png" style="width: 42px; height: 42px;" />
        </div>`,
  iconSize: [42, 42],
  iconAnchor: [21, 21],
  popupAnchor: [1, -34],
  className: "no-background-icon"
})

const RecenterAutomatically = ({ lat, lng }) => {
  const map = useMap()
  useEffect(() => {
    map.setView([lat, lng], map.getZoom())
  }, [lat, lng, map])
  return null
}

RecenterAutomatically.propTypes = {
  lat: PropTypes.number,
  lng: PropTypes.number,
}

const Map = ({widthMap, heightMap, latLonCenter, showPath=false, pathNav = [], children}) => {
  const degreeRobot = useSelector(state => state.odometryRobot.yaw)
  return (
  <MapContainer
    center={latLonCenter}
    zoom={18}
    style={{ width: widthMap, height: heightMap }}
  >
    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      maxNativeZoom={19}
      maxZoom={22}
    />
    <Marker position={latLonCenter} icon={iconRobot(degreeRobot)}>
      <Popup>
        GPS Robot: {latLonCenter[0]}, {latLonCenter[1]}
      </Popup>
    </Marker>
    {showPath && pathNav.length > 0 && (
      <Polyline positions={pathNav} color="blue">
        <Popup>Ruta seguida por el robot en esta sesión.</Popup>
      </Polyline>
    )}
    {children}
    <RecenterAutomatically
      lat={latLonCenter[0]}
      lng={latLonCenter[1]}
    />
  </MapContainer>
  )
}

Map.propTypes = {
  widthMap: PropTypes.string,
  heightMap: PropTypes.string,
  latLonCenter: PropTypes.array,
  showPath: PropTypes.bool,
  pathNav: PropTypes.array,
  children: PropTypes.element
}

export default Map