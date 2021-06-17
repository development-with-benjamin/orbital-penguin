import './App.css';

import React, { useState } from 'react';
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'
import DatasetChoiceBox from './components/DatasetChoiceBox/container'
import Map from './components/Map/container'

const App = () => {

  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <header></header>
      <main>
        <DatasetChoiceBox isLoading={isLoading} setIsLoading={setIsLoading}/>    
        <Map setIsLoading={setIsLoading} />
      </main>
      <footer></footer>
    </>
  )
}

export default App;
