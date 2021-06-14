import './App.css';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useDispatch } from "react-redux"
import fetchCategoriesActionCreator from "./redux/action-creators/fetch-categories"

import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'

import DatasetChoiceBox from './components/DatasetChoiceBox/container'
import Map from './components/Map/container'

const App = () => {
  const dispatch = useDispatch();

  useEffect( () => dispatch(fetchCategoriesActionCreator), []);
 

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
        <Map />
      </main>
      <footer></footer>
    </>
  )
}

export default App;
