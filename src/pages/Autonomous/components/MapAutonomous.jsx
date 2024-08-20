import React from 'react'
import PropTypes from 'prop-types'
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, Polyline, Popup, TileLayer, useMap } from "react-leaflet";
import { Box } from '@mui/material';


const RecenterAutomatically = ({ lat, lng }) => {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng], map.getZoom());
  }, [lat, lng, map]);
  return null;
};


const MapAutonomous = ({
  rosInstance,
}) => {
  return (
    <Box>
      MapAutonomous
    </Box>
  )
}

MapAutonomous.propTypes = {
  rosInstance: PropTypes.object
}

export default MapAutonomous