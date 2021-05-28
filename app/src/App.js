import './App.css';

import React, { useState, useRef, useCallback } from 'react';
import DeckGL from '@deck.gl/react';
import MapGL from 'react-map-gl';
import Geocoder from 'react-map-gl-geocoder'
import {layers} from './layers';

import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'

import DatasetChoiceBox from './components/DatasetChoiceBox/'

const MAPBOX_ACCESS_TOKEN = "";

const App = () => {
  const [viewport, setViewport] = useState({
    latitude: 34.068739,
    longitude: -118.323170,
    zoom: 8
  });

  const mapRef = useRef();
  const handleViewportChange = useCallback(
    (newViewport) => setViewport(newViewport),
    []
  );

  const onDatasetChange = (value) => {
    console.log(" iam here")
    if(value === "heatmap") {
      setViewport({latitude: 40.73, longitude: -73.75, zoom: 9})
    } 
    else if (value === "hexagon") {
      setViewport({latitude: 34.068739, longitude: -118.323170, zoom: 10})
    }
  }

  return (
    <>
      <header></header>
      <main>
        <DatasetChoiceBox onChange={onDatasetChange} />    

          <div style={{ height: "100vh" }}>
          
                <MapGL
                  ref={mapRef}
                  {...viewport}
                  width="100%"
                  height="100%"
                  onViewportChange={handleViewportChange}
                  mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
                  // mapStyle="mapbox://styles/mapbox/dark-v9"
                >
                  <Geocoder
                    mapRef={mapRef}
                    onViewportChange={handleViewportChange}
                    mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
                    position="top-right" 
                  />
                  <DeckGL
                    initialViewState={viewport}
                    controller={true}
                    layers={layers}
                  ></DeckGL>
                </MapGL>
        
              </div>
        );
        </main>
        <footer></footer>
      </>
  )
}

export default App;
