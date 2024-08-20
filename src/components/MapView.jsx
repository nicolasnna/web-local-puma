import 'leaflet/dist/leaflet.css';
import PropTypes from 'prop-types';
import { useEffect, useState } from "react";
import { MapContainer, Marker, Polyline, Popup, TileLayer, useMap } from "react-leaflet";
import { useSelector } from "react-redux";
import ContainerElement from "@components/ContainerElement";
import useCurrentTime from "@hooks/useCurrentTime";
import { GPS_TOPIC } from "@utils/constants";

const RecenterAutomatically = ({ lat, lng }) => {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng], map.getZoom());
  }, [lat, lng, map]);
  return null;
};

const MapView = ({ 
  rosInstance, 
  showPath = false,
  widthMap = '35vw',
  heightMap = '40vh'
}) => {
  const [position, setPosition] = useState([0,0])
  const [path, setPath] = useState([])
  const rosIsConnected = useSelector(state => state.ros.isConnected)
  const currentTime = useCurrentTime()

  useEffect(() => {
    if (rosIsConnected) {
      rosInstance.subscribe(GPS_TOPIC, 'sensor_msgs/NavSatFix', handleGpsMessage)
    }
  },[rosIsConnected])


  const handleGpsMessage = (message) => {
    const {latitude, longitude} = message
    const newPosition = [latitude, longitude]
    setPosition(newPosition)
    if (showPath) {
      setPath(prevPath => [...prevPath, newPosition])
    }
    currentTime.getCurrentTime()
  }

  return (
    <ContainerElement
      Title={"Posición global"}
      Topic={GPS_TOPIC}
      currentDate={currentTime.value}
    >
      <MapContainer 
        center={position} 
        zoom={25} 
        style={{width: widthMap, height:heightMap}}
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
        {showPath && path.length>0 && <Polyline positions={path} color="blue">
          <Popup>
            Ruta seguida por el robot en esta sesión.
          </Popup>
        </Polyline>}
        <RecenterAutomatically lat={position[0]} lng={position[1]} />
      </MapContainer>
    </ContainerElement>
  )
}

MapView.propTypes = {
  rosInstance: PropTypes.object,
  showPath: PropTypes.bool,
  widthMap: PropTypes.string,
  heightMap: PropTypes.string
}

export default MapView