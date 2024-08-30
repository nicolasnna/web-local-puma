import ContainerElement from '@components/ContainerElement';
import useCurrentTime from '@hooks/useCurrentTime';
import { GPS_TOPIC } from "@utils/constants";
import 'leaflet/dist/leaflet.css';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { useDispatch, useSelector } from 'react-redux';
import SelectorMarker from './SelectorMarker';
import { Box, Button, Typography } from '@mui/material';
import { addLabel, addPosition } from '@reducer/positionReducer';
import { errorNotification, successNotification } from '@reducer/notificationReducer';
import L from 'leaflet';

const RecenterAutomatically = ({ lat, lng }) => {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng], map.getZoom());
  }, [lat, lng, map]);
  return null;
};

RecenterAutomatically.propTypes = {
  lat: PropTypes.number,
  lng: PropTypes.number
}

const iconLastGoal = new L.Icon({
  iconUrl: 'goal.png',  
  iconSize: [41, 41],  
  iconAnchor: [13, 41],  
  popupAnchor: [1, -34],  
});

const iconPLannedGoal = new L.Icon({
  iconUrl: 'path-goal.png',  
  iconSize: [41, 41],  
  iconAnchor: [13, 41],  
  popupAnchor: [1, -34],  
});

const MapAutonomous = ({
  rosInstance,
  widthMap = '35vw',
  heightMap = '40vh'
}) => {
  const [position, setPosition] = useState([-33.421946, -70.58190])
  const [createGoal, setCreateGoal] = useState(false)
  const rosIsConnected = useSelector(state => state.ros.isConnected)
  const storePosition = useSelector(state => state.position)
  const currentTime = useCurrentTime()
  const dispatch = useDispatch()

  useEffect(() => {
    if (rosIsConnected) {
      rosInstance.subscribe(GPS_TOPIC, 'sensor_msgs/NavSatFix', handleGpsMessage)
    }
  },[rosIsConnected])
  
  const handleGpsMessage = (message) => {
    const {latitude, longitude} = message
    const newPosition = [latitude, longitude]
    setPosition(newPosition)
    currentTime.getCurrentTime()
  }
  
  const startCreateGoal = () => {
    setCreateGoal(!createGoal)
  }

  const saveGoal = () => {
    if (storePosition.currentSelection.length !== 0) {
      dispatch(addPosition(storePosition.currentSelection))
      const number = storePosition.selectedPosition.length+1
      dispatch(addLabel(`Destino ${number}`))
      dispatch(successNotification(`Se ha creado correctamente el destino ${number}`))
    } else {
      dispatch(errorNotification("No se ha logrado crear el nuevo destino, mueva el marcador antes de guardar"))
    }
  }

  return (
    <ContainerElement
      Title={"Mapa navegación autónoma"}
      Topic={GPS_TOPIC}
      currentDate={currentTime.value}
    >
      <Box>
        <Box className="map-autonomous__options">
          <Button className={createGoal ? 'button--secondary' : 'button--primary'} onClick={startCreateGoal}>
            Crear destino
          </Button>
          <Button className={'button--primary'} disabled={!createGoal} onClick={saveGoal}>
            Guardar destino
          </Button>
          {createGoal && <Typography>
            Arrastra el marcador rojo para ubicar el destino
          </Typography>}
        </Box>
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
              Posición del robot actual: {position[0]}, {position[1]}
            </Popup>
          </Marker>
          {storePosition.selectedPosition.map((pos,index) => (
            <Marker 
              key={`Destino ${index+1}`} 
              position={pos} 
              icon={index === storePosition.selectedPosition.length-1 ? iconLastGoal : iconPLannedGoal}
            >
              <Popup>
                {storePosition.labelSelection[index]}: [{pos[0].toFixed(4)}, {pos[1].toFixed(4)}]
              </Popup>
            </Marker>
          ))}
          {createGoal && <SelectorMarker initialPosition={position}/>}
          <RecenterAutomatically lat={position[0]} lng={position[1]} />
        </MapContainer>
      </Box>
    </ContainerElement>
  )
}

MapAutonomous.propTypes = {
  rosInstance: PropTypes.object,
  showPath: PropTypes.bool,
  widthMap: PropTypes.string,
  heightMap: PropTypes.string
}

export default MapAutonomous