import ContainerElement from "@components/ContainerElement"
import Map from "@components/Map/Map"
import { Box, Button, Stack, Typography } from "@mui/material"
import {
  errorNotification,
  successNotification,
} from "@reducer/notificationReducer"
import { addLabel, addPosition, updatePosition } from "@reducer/positionReducer"
import { GPS_TOPIC } from "@utils/constants"
import L from "leaflet"
import PropTypes from "prop-types"
import { useState } from "react"
import { Marker, Popup } from "react-leaflet"
import { useDispatch, useSelector } from "react-redux"
import SelectorMarker from "./SelectorMarker"

const iconLastGoal = new L.Icon({
  iconUrl: "goal.png",
  iconSize: [41, 41],
  iconAnchor: [13, 41],
  popupAnchor: [1, -34],
})

const iconPLannedGoal = (number) => new L.divIcon({
  html: `<div >
    <p style="position: absolute">${number}</p>
    <img src ="path-goal.png" style="width: 41px; height: 41px;"/>
  </div>`,
  iconSize: [41, 41],
  iconAnchor: [13, 41],
  popupAnchor: [1, -34],
  className: "no-background-icon"
})

const MapAutonomous = ({ widthMap = "35vw", heightMap = "40vh" }) => {
  const [createGoal, setCreateGoal] = useState(false)
  const [draggableMarkerIndex, setDraggableMarkerIndex] = useState(null) // Estado para el índice del marcador arrastrable
  const storePosition = useSelector((state) => state.position)
  const dispatch = useDispatch()
  const newPosition = useSelector((state) => state.gpsRos.latLon)
  const timeGps = useSelector(state => state.gpsRos.timeUploaded)
  const position = newPosition.length > 0 ? newPosition : [-33.421946, -70.5819]

  const startCreateGoal = () => {
    setCreateGoal(!createGoal)
  }

  const saveGoal = () => {
    if (storePosition.currentSelection.length !== 0) {
      dispatch(addPosition(storePosition.currentSelection))
      const number = storePosition.selectedPosition.length + 1
      dispatch(addLabel(`Destino ${number}`))
      dispatch(
        successNotification(`Se ha creado correctamente el destino ${number}`)
      )
    } else {
      dispatch(
        errorNotification(
          "No se ha logrado crear el nuevo destino, mueva el marcador antes de guardar"
        )
      )
    }
  }

  const toggleDraggable = (index) => {
    setDraggableMarkerIndex(index === draggableMarkerIndex ? null : index)
  }

  const handleDragEnd = (event, index) => {
    const { lat, lng } = event.target.getLatLng()
    const updatedPosition = [lat, lng]

    // Actualiza la posición en Redux
    console.log(updatedPosition)
    dispatch(updatePosition({ index, position: updatedPosition }))
    // Desactiva el modo arrastrable
    setDraggableMarkerIndex(null)
  }

  return (
    <ContainerElement
      Title={"Mapa navegación autónoma"}
      Topic={GPS_TOPIC}
      currentDate={timeGps}
    >
      <Box>
        <Box className="map-autonomous__options">
          <Button
            className={createGoal ? "button--secondary" : "button--primary"}
            onClick={startCreateGoal}
          >
            {createGoal ? "Cerrar creador" : "Crear destino"}
          </Button>
          <Button
            className={"button--primary"}
            disabled={!createGoal}
            onClick={saveGoal}
          >
            Guardar destino
          </Button>
          {createGoal && (
            <Typography>
              Arrastra el marcador rojo para ubicar el destino
            </Typography>
          )}
        </Box>
        <Map
          widthMap={widthMap}
          heightMap={heightMap}
          latLonCenter={position}
          showPath={true}
        >
          <>
            {storePosition.selectedPosition.map((pos, index) => (
              <Marker
                key={`Destino ${index + 1}`}
                position={pos}
                icon={
                  index === storePosition.selectedPosition.length - 1
                    ? iconLastGoal
                    : iconPLannedGoal(index+1)
                }
                draggable={index === draggableMarkerIndex} // Activa o desactiva el arrastre según el índice
                eventHandlers={{
                  dragend: (event) => handleDragEnd(event, index),
                }}
              >
                <Popup>
                  <Stack padding={0}>
                    {storePosition.labelSelection[index]}: [{pos[0].toFixed(4)},{" "}
                    {pos[1].toFixed(4)}]
                    <Button onClick={() => toggleDraggable(index)}>
                      {index === draggableMarkerIndex ? "Fijar posición" : "Mover destino"}
                    </Button>
                  </Stack>
                </Popup>
              </Marker>
            ))}
            {createGoal && <SelectorMarker initialPosition={position} />}
          </>
        </Map>
      </Box>
    </ContainerElement>
  )
}

MapAutonomous.propTypes = {
  rosInstance: PropTypes.object,
  showPath: PropTypes.bool,
  widthMap: PropTypes.string,
  heightMap: PropTypes.string,
}

export default MapAutonomous
