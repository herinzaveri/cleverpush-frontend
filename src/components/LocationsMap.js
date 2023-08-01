import ReactMapGL, {Marker} from 'react-map-gl';
import classes from './LocationsMap.module.css';
import config from '../config';
import {useState} from 'react';

const MAPBOX_ACCESS_TOKEN = config.mapboxAccessToken;

const LocationsMap = ({locations}) => {
  const [viewport, setViewport] = useState({
    latitude: 23.0225,
    longitude: 72.5714,
    zoom: 10,
  });

  return <div>
    <div className={classes.wrapper}>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
        onViewportChange={(newViewport) => setViewport(newViewport)}
        width='100%'
        height='100%'
        mapStyle={'mapbox://styles/mapbox/streets-v11'}
      >
        {
          locations.map((location) => (
            <Marker
              key={location._id}
              latitude={location.latitude}
              longitude={location.longitude}
              offsetLeft={-12}
              offsetTop={-24}
            >
              <div style={{fontSize: 30}}>📍</div>
            </Marker>
          ))
        }
      </ReactMapGL>
    </div>
  </div>;
};

export default LocationsMap;
