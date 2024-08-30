import { useMemo, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { Marker, Popup } from 'react-leaflet'
import { useDispatch, useSelector } from 'react-redux'
import { Typography } from '@mui/material'
import L from 'leaflet';
import { setCurrent } from '@reducer/positionReducer'

const customIcon = new L.Icon({
  iconUrl: 'selector-position.png',  
  iconSize: [41, 41],  
  iconAnchor: [20, 41],  
  popupAnchor: [1, -34],  
});

function SelectorMarker({initialPosition}) {
  const [position, setPosition] = useState(initialPosition)
  const arrayPosition = useSelector(state => state.position.selectedPosition)
  const markerRef = useRef(initialPosition)
  const dispatch = useDispatch()
  const eventHandler = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current
        if (marker != null) {
          setPosition([marker.getLatLng().lat,marker.getLatLng().lng])
          dispatch(setCurrent([marker.getLatLng().lat,marker.getLatLng().lng]))
          marker.openPopup()
        }
      }
    }), [dispatch],
  ) 
  return (
    <Marker 
      draggable={true} 
      eventHandlers={eventHandler} 
      position={position} 
      ref={markerRef} 
      icon={customIcon}
      zIndexOffset={4}
    >
      <Popup minWidth={90}>
        <Typography>
          Ubicación destino {arrayPosition.length+1}: [{position[0]}, {position[1]}]
        </Typography>
      </Popup>
    </Marker>
  )
}

SelectorMarker.propTypes = {
  initialPosition: PropTypes.array,
}

export default SelectorMarker
