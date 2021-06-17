import React, { useState, useEffect, useRef, useCallback } from 'react';
import DeckGL from '@deck.gl/react';
import MapGL from 'react-map-gl';
import Geocoder from 'react-map-gl-geocoder'
// import {layers} from './../../layers';

import HexagonLayerExample from '../../layers/hexagon';

const MAPBOX_ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN || "";


const Map = ({ setIsLoading, onLoadData, category }) => {

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { onLoadData(); }, []);
    const [currentData, seCurrentData] = useState({})
    const [currentLayer, setCurrentLayer] = useState({})
    const [hasLoaded, setHasLoaded] = useState(false)

    useEffect(() => {
      seCurrentData(category)
      setCurrentLayer(HexagonLayerExample({ currentData } ))
      setIsLoading(false)

      if(!hasLoaded) {
        setViewport(currentData.data 
          ? {latitude: currentData.data[2000].lat, longitude: currentData?.data[2000].lng, zoom: 5} 
          : {latitude: 40.73, longitude: -73.75, zoom: 9}
        );
        setHasLoaded(true);
      }
      
    }, [category, currentData, hasLoaded])

  
    const [viewport, setViewport] = useState({
        latitude: 80.306,
        longitude: -170.365,
        zoom: 15
      });
    
      const mapRef = useRef();
      const handleViewportChange = useCallback(
        (newViewport) => setViewport(newViewport),
        []
      );
        
      return (
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
                layers={[currentLayer]}
                ></DeckGL>
            </MapGL>
        </div>
    )
}

export default Map;