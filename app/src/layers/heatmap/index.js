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

import {HeatmapLayer} from '@deck.gl/aggregation-layers';

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

const HeatmapLayerExample = () => {

    const DATA_URL = 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/screen-grid/uber-pickup-locations.json'; // eslint-disable-line

  return new HeatmapLayer({
        data: DATA_URL,
        id: 'heatmp-layer',
        pickable: false,
        getPosition: d => [d[0], d[1]],
        getWeight: d => d[2],
        intensity: 1,
        threshold: 0.03,
        radiusPixels: 50,
    })
  
}

export default HeatmapLayerExample;