import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useLoaderData } from "react-router";
import 'leaflet/dist/leaflet.css'
const Coverage = () => {
  const covaregeData = useLoaderData();

  return (
   <div className="h-[800px] my-10 w-full">
     <MapContainer  className="h-[800px] w-full" center={[23.8103,90.4125]} zoom={8} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {covaregeData.map((data,index)=><Marker  className="h-[800px] w-full" key={index} position={[data.latitude,data.longitude]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>)}
    </MapContainer>
   </div>
  );
};

export default Coverage;
/***city
: 
"Dhaka"
covered_area
: 
(4) ['Uttara', 'Dhanmondi', 'Mirpur', 'Mohammadpur']
district
: 
"Dhaka"
flowchart
: 
"https://example.com/dhaka-flowchart.png"
latitude
: 
23.8103
longitude
: 
90.4125
region
: 
"Dhaka"
status
: 
"active" */
