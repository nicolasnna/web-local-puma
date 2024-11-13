import ContainerElement from '@components/ContainerElement';
import { Box, Button, Stack, Typography } from '@mui/material';
import {
  errorNotification,
  successNotification,
} from '@reducer/notificationReducer';
import {
  pushWaypointsKeyValue,
  setWaypointsKeyValue,
} from '@reducer/waypointsReducer';
import L from 'leaflet';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Marker, Popup } from 'react-leaflet';
import { useDispatch, useSelector } from 'react-redux';
import { Map, SelectorMarker } from '.';

const iconLastGoal = new L.Icon({
  iconUrl: 'goal.png',
  iconSize: [41, 41],
  iconAnchor: [13, 41],
  popupAnchor: [1, -34],
});

const iconPLannedGoal = (number) =>
  new L.divIcon({
    html: `<div >
    <p style="position: absolute">${number}</p>
    <img src ="path-goal.png" style="width: 50px; height: 50px;"/>
  </div>`,
    iconAnchor: [15, 48],
    popupAnchor: [1, -34],
    className: 'no-background-icon',
  });

export const MapAutonomous = ({ widthMap = '35vw', heightMap = '40vh' }) => {
  const [createGoal, setCreateGoal] = useState(false);
  const [draggableMarkerIndex, setDraggableMarkerIndex] = useState(null);
  const { waypoints, currentSelection } = useSelector(
    (state) => state.waypoints.web
  );
  const dispatch = useDispatch();
  const { latitude, longitude, time } = useSelector(
    (state) => state.subscribers.gps
  );

  const startCreateGoal = () => {
    setCreateGoal(!createGoal);
  };

  const saveGoal = () => {
    if (currentSelection.latitude) {
      const label = `Destino ${waypoints.length + 1}`;

      dispatch(
        pushWaypointsKeyValue('web', 'waypoints', {
          ...currentSelection,
          label,
        })
      );
      dispatch(setWaypointsKeyValue('web', 'currentSelection', {}));
      dispatch(successNotification(`Se ha creado correctamente '${label}'`));
    } else {
      dispatch(
        errorNotification(
          'No se ha logrado crear el nuevo destino, arrastre el marcador antes de guardar'
        )
      );
    }
  };

  const toggleDraggable = (index) => {
    setDraggableMarkerIndex(index === draggableMarkerIndex ? null : index);
  };

  const handleDragEnd = (event, index) => {
    const { lat, lng } = event.target.getLatLng();
    console.log(waypoints);
    let newWaypoints = [...waypoints];
    newWaypoints[index] = {
      latitude: lat,
      longitude: lng,
      label: newWaypoints[index].label,
    };
    console.log(newWaypoints);
    dispatch(setWaypointsKeyValue('web', 'waypoints', newWaypoints));
    // Desactiva el modo arrastrable
    setDraggableMarkerIndex(null);
  };

  return (
    <ContainerElement Title={'Mapa navegación'} currentDate={time}>
      <Box>
        <Map
          widthMap={widthMap}
          heightMap={heightMap}
          latitude={latitude}
          longitude={longitude}
          showPath={true}
        >
          <>
            {waypoints.map((w, index) => (
              <Marker
                key={`Destino ${index + 1}`}
                position={[w.latitude, w.longitude]}
                icon={
                  index === waypoints.length - 1
                    ? iconLastGoal
                    : iconPLannedGoal(index + 1)
                }
                draggable={index === draggableMarkerIndex}
                eventHandlers={{
                  dragend: (event) => handleDragEnd(event, index),
                }}
              >
                <Popup>
                  <Stack padding={0}>
                    {waypoints.label}: [{w.latitude.toFixed(4)},{' '}
                    {w.longitude.toFixed(4)}]
                    <Button onClick={() => toggleDraggable(index)}>
                      {index === draggableMarkerIndex
                        ? 'Fijar posición'
                        : 'Mover destino'}
                    </Button>
                  </Stack>
                </Popup>
              </Marker>
            ))}
            {createGoal && (
              <SelectorMarker initialPosition={[latitude, longitude]} />
            )}
          </>
        </Map>
        <Box className="map-autonomous__options">
          <Button
            className={createGoal ? 'button--secondary' : 'button--primary'}
            onClick={startCreateGoal}
          >
            {createGoal ? 'Cerrar creador' : 'Crear destino'}
          </Button>
          <Button
            className={'button--primary'}
            disabled={!createGoal}
            onClick={saveGoal}
          >
            Guardar destino
          </Button>

          <Typography>
            {createGoal
              ? 'Arrastra el marcador rojo para ubicar el destino'
              : "Presione en 'crear destino' para definir waypoints"}
          </Typography>
        </Box>
      </Box>
    </ContainerElement>
  );
};

MapAutonomous.propTypes = {
  rosInstance: PropTypes.object,
  showPath: PropTypes.bool,
  widthMap: PropTypes.string,
  heightMap: PropTypes.string,
};
