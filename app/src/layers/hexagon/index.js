/*
 * Copyright 2019 Google LLC
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *  https://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {HexagonLayer} from '@deck.gl/aggregation-layers';

/*
 * Demo of Hexagon Layer that aggregates Los Angeles active business data
 *
 * Datasource: Los Angeles Open Data
 * https://data.lacity.org/A-Prosperous-City/Listing-of-Active-Businesses/6rrh-rzua
 */

export const getMapOptions = ()  => {
  return {
    center: {lat: 34.068739, lng: -118.323170},
    zoom: 13
  }
}

const HexagonLayerExample = () => {

  const DATA_URL = `https://data.lacity.org/resource/6rrh-rzua.json`,
        qs = '?$limit=150000&$WHERE=location_1 IS NOT NULL';

  return new HexagonLayer({
    id: 'heatmap',
    data: DATA_URL + qs,
    colorDomain: [0,50],
    getPosition: d => [+d.location_1.longitude, +d.location_1.latitude],
    colorRange: [   
      [196, 255, 255],
      [116, 255, 255],
      [72, 189, 150],  
      [0, 171, 152],
      [63, 141, 90],  
      [47, 142, 34]
    ],        
    elevationRange: [0, 300],
    elevationScale: 250,
    extruded: true,
    radius: 500,        
    opacity: 1,        
    upperPercentile: 50,
    coverage: 0.8
  })
  
}

export default HexagonLayerExample;