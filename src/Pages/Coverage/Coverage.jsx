import React, { useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useLoaderData } from "react-router";
import "leaflet/dist/leaflet.css";
const Coverage = () => {
  const covaregeData = useLoaderData();
  const cityRef=useRef(null)
  const handeSearch = (e) => {
    e.preventDefault()
    const locaionName=e.target.search.value;
    const city=covaregeData.find(data=>data.city.toLowerCase().includes(locaionName.toLowerCase()))
   if(city){
    const searchedCity=[city.latitude,city.longitude]
    cityRef.current.flyTo(searchedCity,13)
   }
  };
  return (
    <div>
      <h1 className="text-center text-neutral text-4xl">Our Covereage</h1>
      <div className="flex relative">
        <form onSubmit={handeSearch}>
          <input
            name="search"
            className="input focus:outline-0 focus:ring-0 focus:border-gray-200 rounded-3xl relative"
            type="text"
          />
          <button className="px-3 py-2 bg-primary rounded-r-3xl z-10 absolute top-0 left-40">
            Search
          </button>
        </form>
      </div>
      <div className="h-[800px] my-10 w-full">
        <MapContainer
          className="h-[800px] w-full"
          center={[23.8103, 90.4125]}
          zoom={8}
          scrollWheelZoom={false}
          ref={cityRef}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {covaregeData.map((data, index) => (
            <Marker 
              className="h-[800px] w-full"
              key={index}
              position={[data.latitude, data.longitude]}
            >
              <Popup>
                <strong>{data.city}</strong>{" "}
                <p>{data.covered_area.join(",")}</p>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
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
