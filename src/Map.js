import React from 'react';
import { MapContainer as LeafletMap, TileLayer, Marker } from 'react-leaflet';
import './Map.css';
import { showDataOnMap } from './util';


function Map({countries, casesType, center, zoom}) {
    return (
        <div className= "map">
            <LeafletMap center={center} zoom={zoom}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                {/* Loop throough and draw circles on the screen */}


                {/* {showDataOnMap(countries, casesType)} */}
            </LeafletMap>
           
        </div>
    );
}

export default Map;
