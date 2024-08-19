import { useEffect, useState } from "react"
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet"
import 'leaflet/dist/leaflet.css';
import { useSelector } from "react-redux";
import ContainerElement from "../../../components/ContainerElement";
import { GPS_TOPIC } from "../../../utils/constants";
import PropTypes from 'prop-types'

const RecenterAutomatically = ({ lat, lng }) => {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng], map.getZoom());
  }, [lat, lng, map]);
  return null;
};

const MapView = ({ rosInstance }) => {
  const [position, setPosition] = useState([0,0])
  const rosIsConnected = useSelector(state => state.ros.isConnected)

  useEffect(() => {
    if (rosIsConnected) {
      rosInstance.subscribe(GPS_TOPIC, 'sensor_msgs/NavSatFix', handleGpsMessage)
    }
  },[rosIsConnected])

  const handleGpsMessage = (message) => {
    const {latitude, longitude} = message
    setPosition([latitude, longitude])
  }

  return (
    <ContainerElement
      Title={"Posición global"}
      Topic={GPS_TOPIC}
    >
      <MapContainer 
        center={position} 
        zoom={25} 
        style={{width:'35vw', height:'40vh'}}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker 
          position={position} 
        >
          <Popup>
            Robot position: {position[0]}, {position[1]}
          </Popup>
        </Marker>
        <RecenterAutomatically lat={position[0]} lng={position[1]} />
      </MapContainer>
    </ContainerElement>
  )
}

MapView.propTypes = {
  rosInstance: PropTypes.object
}

export default MapView