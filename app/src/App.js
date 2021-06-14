import './App.css';

import React from 'react';
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'
import DatasetChoiceBox from './components/DatasetChoiceBox/container'
import Map from './components/Map/container'

const App = () => {
  return (
    <>
      <header></header>
      <main>
        <DatasetChoiceBox />    
        <Map />
      </main>
      <footer></footer>
    </>
  )
}

export default App;
