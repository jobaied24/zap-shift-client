// import { useState } from "react";
// import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// // ⚠️ Leaflet marker fix
// import L from "leaflet";
// import branches from '../assets/warehouses.json'
// import markerIcon from "leaflet/dist/images/marker-icon.png";
// import markerShadow from "leaflet/dist/images/marker-shadow.png";

// delete L.Icon.Default.prototype._getIconUrl;

// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: markerIcon,
//   iconUrl: markerIcon,
//   shadowUrl: markerShadow,
// });



// function FlyToLocation({position}){
//   const map = useMap();

//   if(position){
//     map.flyTo(position,10,{duration:1.5});
//   }
//       return null;
// }

// const Coverage = () => {
//   const [search, setSearch] = useState("");
//   const [targetPosition,setTargetPosition] = useState(null);

//   const handleSearch = e =>{
//     e.preventDefault();

//   const match = branches.find(
//     (branch) =>
//       branch.district.toLowerCase().includes(search.toLowerCase())
//   );


//   if(match){
//          setTargetPosition([match.latitude,match.longitude]);
//   }
//   else{
//     alert("District not found");
//   }
//   }



//   return (
//     <section className="py-20 bg-base-200">
//       <div className="max-w-7xl mx-auto px-4">

//         {/* Title */}
//         <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
//           We are available in 64 districts
//         </h2>

//         {/* Search */}
//         <div className="max-w-md mx-auto mb-8">
//           <form onSubmit={handleSearch}>
//           <input
//             type="text"
//             placeholder="Search district..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="input input-bordered w-full"
//           />
//           </form>

//         </div>


//         {/* Map */}
//         <div className="h-[700px] w-full rounded-lg overflow-hidden shadow-lg">
//           <MapContainer
//             center={[23.685, 90.3563]}
//             zoom={7}
//             scrollWheelZoom={false}
//             className="h-full w-full"
//           >
//             <TileLayer
//               attribution="&copy; OpenStreetMap"
//               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             />

//             <FlyToLocation position={targetPosition}></FlyToLocation>

//             {/* {filteredBranches.map((branch, index) => (
//               <Marker
//                 key={index}
//                 position={[branch.latitude, branch.longitude]}
//               >
//                 <Popup>
//                   <div className="space-y-1">
//                     <h3 className="font-semibold">{branch.district}</h3>
//                     <p className="text-sm text-gray-600">
//                       Region: {branch.region}
//                     </p>
//                     <p className="text-xs">
//                       Covered Area: {branch.covered_area.join(", ")}
//                     </p>
//                   </div>
//                 </Popup>
//               </Marker>
//             ))} */}

//            {
//             branches.map((branch,index) =>(
//               <Marker
//               key={index}
//               position={[branch.latitude,branch.longitude]}
//               >
//                 <Popup>
//                   <div>
//                     <h3 className="font-semibold">{branch.district}</h3>
//                     <p>Region: {branch.region}</p>
//                     <p className="text-xs">Covered Area: {branch.covered_area.join(", ")}</p>
//                   </div>
//                 </Popup>

//               </Marker>
//             ))
//           }

//           </MapContainer>
//         </div>

//       </div>
//     </section>
//   );
// };

// export default Coverage;
