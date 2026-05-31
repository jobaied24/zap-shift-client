import React, { useState } from 'react';
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { useLoaderData } from 'react-router';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon,
    iconUrl: markerIcon,
    shadowUrl: markerShadow
});


function FlyToLocation({position}){
    const map = useMap();
    if(position){
      map.flyTo(position,10,{duration:1.5});
    };

    return  null;
};

const Coverage1 = () => {
    const [search, setSearch] = useState('');
    const [targetLocation,setTargetLocation]=useState(null);
    const branches = useLoaderData();

    console.log(search);
    console.log(targetLocation); 

    const handleSearch = e =>{
        e.preventDefault();
        console.log('helllo');

        const match = branches.find((branch)=>
        branch.district.toLowerCase().includes(search.toLowerCase())
        );

        if(match){
            setTargetLocation([match.latitude,match.longitude])
        }
        else{
            alert('District not found')
        };
         
        return null;
    };


    return (
        <section className='py-16 bg-base-200'>
            <div className='text-center max-w-7xl px-4'>
                <h2 className='mb-6 text-3xl md:text-4xl text-gray-800 font-semibold'> We are available in 64 districts</h2>


              {/* search form */}
              <form onSubmit={handleSearch}>
                <input type="text" placeholder='search district'
                 onChange={(e)=>{setSearch(e.target.value)}} 
                 value={search} 
                className='input input-bordered mb-10' />
              </form>

                {/* map */}
                <div className='h-[600px] w-full overflow-hidden rounded-lg shadow-lg'>
                    <MapContainer
                        center={[23.6850, 90.3563]}
                        zoom={7}
                        scrollWheelZoom={false}
                        className='h-full w-full'
                    >

                        <TileLayer   
                            attribution='&copy openstreetmap'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        >
                        </TileLayer>
                        
                      <FlyToLocation position={targetLocation}></FlyToLocation>
                      {/* marker */}
                        {
                            branches.map((branch, index) => (
                                <Marker
                                    key={index}
                                    position={[branch.latitude, branch.longitude]}
                                >
                                    <Popup>
                                        <h5 className='font-semibold'>{branch.district}</h5>
                                        <p>Region: {branch.region}</p>
                                        <p>Covered Area: {branch.covered_area.join(', ')}</p>
                                    </Popup>

                                </Marker>
                            ))
                        }

                    </MapContainer>
                </div>

            </div>
        </section>

    );
};

export default Coverage1;