import PropTypes from 'prop-types';
import { useEffect } from 'react';
import {
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
  useMap,
} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useSelector } from 'react-redux';

const iconRobot = (rotationAngle) =>
  new L.divIcon({
    html: `<div style="transform: rotate(${rotationAngle + 90}deg)">
          <img src="icon-atv.png" style="width:66px; height:66px;" />
        </div>`,
    iconAnchor: [10,66],
    popupAnchor: [0, -20],
    className: 'no-background-icon',
  });

const RecenterAutomatically = ({ lat, lng }) => {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng], map.getZoom());
  }, [lat, lng, map]);
  return null;
};

RecenterAutomatically.propTypes = {
  lat: PropTypes.number,
  lng: PropTypes.number,
};

export const Map = ({
  widthMap,
  heightMap,
  latitude,
  longitude,
  showPath = false,
  pathNav = [],
  children,
}) => {
  const degreeRobot = useSelector((state) => state.subscribers.odometry.yaw);
  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={18}
      style={{ width: widthMap, height: heightMap }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        maxNativeZoom={19}
        minZoom={18}
        maxZoom={21}
      />
      <Marker position={[latitude, longitude]} icon={iconRobot(degreeRobot)}>
        <Popup>
          GPS Robot: {latitude}, {longitude}
        </Popup>
      </Marker>
      {showPath && pathNav.length > 0 && (
        <Polyline
          positions={pathNav.map((p) => [p.latitude, p.longitude])}
          color="blue"
        >
          <Popup>Ruta seguida por el robot en esta sesión.</Popup>
        </Polyline>
      )}
      {children}
      <RecenterAutomatically lat={latitude} lng={longitude} />
    </MapContainer>
  );
};

Map.propTypes = {
  widthMap: PropTypes.string,
  heightMap: PropTypes.string,
  latitude: PropTypes.number,
  longitude: PropTypes.number,
  showPath: PropTypes.bool,
  pathNav: PropTypes.array,
  children: PropTypes.element,
};
