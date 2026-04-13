// import { useParams, useNavigate } from "react-router";
// import { useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../../Hook/useAxiosSecure";


// const TrackParcel = () => {
//   const { trackingId } = useParams();
//   const navigate = useNavigate();
//   const axiosSecure = useAxiosSecure();

//   const [searchId, setSearchId] = useState("");

//   const { data: history = [], isLoading, error } = useQuery({
//     queryKey: ["tracking", trackingId],
//     enabled: !!trackingId,
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/tracking/${trackingId}`);
//       return res.data;
//     }
//   });


//   const handleSearch = e =>{
//     e.preventDefault();
//     if(!searchId) return;
//     navigate(`/dashboard/track/${searchId}`);
//   }

//   return (
//     <div className="max-w-3xl mx-auto p-6">

//       <h2 className="text-2xl font-bold mb-6">Track Your Parcel</h2>


//       {/* Search Box */}
//       <form onSubmit={handleSearch} className="flex gap-2 mb-6">
//         <input
//           type="text"
//           placeholder="Enter Tracking ID"
//           className="input input-bordered w-full"
//           value={searchId}
//           onChange={(e) => setSearchId(e.target.value)}
//         />
//         <button className="btn btn-primary">Track</button>
//       </form>

//       {isLoading && <p>Loading tracking data...</p>}

//       {error && (
//         <p className="text-red-500">Tracking ID not found</p>
//       )}

//       {/* Timeline */}
//       {history.length > 0 && (
//         <div className="space-y-4">
//           {history.map((item, index) => (
//             <div
//               key={index}
//               className="border-l-4 border-blue-500 pl-4 pb-4"
//             >
//               <p className="font-semibold text-lg">{item.status}</p>
//               <p className="text-sm text-gray-600">
//                 {item.location}
//               </p>
//               <p className="text-sm text-gray-500">
//                 {new Date(item.createdAt).toLocaleString()}
//               </p>
//               <p className="text-sm">{item.note}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default TrackParcel;

import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import useAxiosSecure from '../../../Hook/useAxiosSecure';

const TrackParcel = () => {
const [searchId,setSearchId]=useState('');
const {trackingId}=useParams();
const axiosSecure=useAxiosSecure();
const navigate = useNavigate();

const {data:track=[],isloading,error}=useQuery({
  queryKey:['tracking',trackingId],
  queryFn:async()=>{
    const track=await axiosSecure.get(`/tracking/${trackingId}`);
    return track.data;
  }
});
console.log(track);


const handleSearch = e =>{
  e.preventDefault();
  if(!searchId) return;
  navigate(`/dashboard/track/${searchId}`)
};

  
  return (
    <div className='p-6 my-14 max-w-2xl w-full mx-auto'>
         <h2 className="text-2xl font-bold mb-6">Track Your Parcel</h2>

<form onSubmit={handleSearch} className="flex gap-2 mb-6">
  <input type="text" className='input border-2 w-full'
   placeholder='Enter Tracking ID'
   value={searchId}
   onChange={(e)=>setSearchId(e.target.value)}
    />
  <button className='btn btn-primary text-white'>Track</button>
</form>
  {
    isloading && <p>Tracking data loading...</p>
  }
  {
    error && <p className='text-error'>Tracking Id not found</p>
  }

   {/* Timeline */}
     {track.length > 0 && (
        <div className="space-y-4">
          {track.map((item, index) => (
            <div
              key={index}
              className="border-l-4 border-blue-500 pl-4 pb-4"
            >
              <p className="font-semibold text-lg">{item.status}</p>
              <p className="text-sm text-gray-600">
                {item.location}
              </p>
              <p className="text-sm text-gray-500">
                {new Date(item.createdAt).toLocaleString()}
              </p>
              <p className="text-sm">{item.note}</p>
            </div>
          ))}
        </div>
        )}
    </div>

  );
};

export default TrackParcel;