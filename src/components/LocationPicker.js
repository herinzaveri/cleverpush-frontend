import React, {useState} from 'react';
import ReactMapGL, {Marker} from 'react-map-gl';
import {Input, Button, Form, message} from 'antd';
import config from '../config';
import classes from './LocationPicker.module.css';
import actions from '../service';
import {useNavigate} from 'react-router-dom';

const MAPBOX_ACCESS_TOKEN = config.mapboxAccessToken;

const LocationPicker = () => {
  const navigate = useNavigate();
  const [viewport, setViewport] = useState({
    latitude: 23.0225,
    longitude: 72.5714,
    zoom: 10,
  });

  const [selectedLocation, setSelectedLocation] = useState({
    latitude: null,
    longitude: null,
  });

  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  const handleMapClick = (event) => {
    setSelectedLocation({
      latitude: event.lngLat[1],
      longitude: event.lngLat[0],
    });
  };

  const handleInputChange = (event) => {
    const {name, value} = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async () => {
    if (!selectedLocation.latitude || !selectedLocation.longitude) {
      return message.error('Please select a location');
    }
    const isSuccess = await actions.addLocation({...selectedLocation, ...formData});
    if (isSuccess) {
      navigate('/dashboard');
    }
  };

  return (
    <div>
      <div className={classes.wrapper}>
        <ReactMapGL
          {...viewport}
          mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
          onViewportChange={(newViewport) => setViewport(newViewport)}
          onClick={handleMapClick}
          width='100%'
          height='100%'
          mapStyle={'mapbox://styles/mapbox/streets-v11'}
        >
          {selectedLocation.latitude !== null && selectedLocation.longitude !== null && (
            <Marker
              latitude={selectedLocation.latitude}
              longitude={selectedLocation.longitude}
              offsetLeft={-12}
              offsetTop={-24}
            >
              <div style={{fontSize: 30}}>📍</div>
            </Marker>
          )}
        </ReactMapGL>
      </div>

      <Form onFinish={handleFormSubmit} style={{maxWidth: 400, margin: 'auto', padding: 20}}>
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: 'Please enter a name',
            },
          ]}
        >
          <Input
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[
            {
              required: true,
              message: 'Please enter a description',
            },
          ]}
        >
          <Input.TextArea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={4}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType='submit'
          >
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LocationPicker;
