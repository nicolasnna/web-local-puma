import { useEffect, useState } from "react"
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet"
import 'leaflet/dist/leaflet.css';
import { useSelector } from "react-redux";

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
      rosInstance.subscribe('/gps/fix', 'sensor_msgs/NavSatFix', handleGpsMessage)
    }
  },[rosIsConnected])

  const handleGpsMessage = (message) => {
    const {latitude, longitude} = message
    setPosition([latitude, longitude])
  }

  return (
    <MapContainer 
      center={position} 
      zoom={25} 
      style={{ height: '400px', width: '500px' }}
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
  )
}

export default MapView