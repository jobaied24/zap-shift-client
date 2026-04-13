// import { useQuery } from '@tanstack/react-query';
// import React from 'react';
// import useAxiosSecure from '../../../Hook/useAxiosSecure';
// import Swal from 'sweetalert2';

// const ActiveRiders = () => {
//     const axiosSecure = useAxiosSecure();
//     const { data: activeRiders = [], isLoading, refetch } = useQuery({
//         queryKey: ['activeRiders'],
//         queryFn: async () => {
//             const activeRes = await axiosSecure.get('/riders/active');
//             return activeRes.data;
//         }
//     });
//     if (isLoading) {
//         return 'Loading...'
//     };
//     console.log(activeRiders);


//     const handleDeactivate = id => {
//         console.log(id);

//         Swal
//             .fire({
//                 title: "Are you sure?",
//                 text: "You won't be able to revert this!",
//                 icon: "warning",
//                 showCancelButton: true,
//                 confirmButtonColor: "#3085d6",
//                 cancelButtonColor: "#d33",
//                 confirmButtonText: "Yes, deactivate it!"
//             }).then((result) => {
//                 if (result.isConfirmed) {

//                     axiosSecure.patch(`/riders/deactivate/${id}`)
//                         .then(res => {
//                             if (res.data.modifiedCount) {
//                                 Swal.fire({
//                                     title: "Deactivated!",
//                                     text: "Rider has been deactivated.",
//                                     icon: "success"
//                                 });
//                                 refetch();
//                             };

//                         });
//                 }
//             });



//     }

//     return (
//         <div className='py-6 overflow-x-auto'>
//             <div className='text-2xl font-bold mb-6 mx-4'>
//                 Active Riders
//             </div>

//             {/* table */}
//             <table className='table px-2'>
//                 {/* heading */}
//                 <thead>
//                     <tr>
//                         <th>#</th>
//                         <th>Name</th>
//                         <th>Region</th>
//                         <th>District</th>
//                         <th>Phone</th>
//                         <th>Status</th>
//                         <th>Action</th>
//                     </tr>
//                 </thead>

//                 {/* body */}
//                 <tbody>
//                     {
//                         activeRiders.map((rider, index) => <tr key={rider._id} className='text-sm'>
//                             <td>{index + 1}</td>
//                             <td>{rider.name}</td>
//                             <td>{rider.region}</td>
//                             <td>{rider.district}</td>
//                             <td>{rider.phone}</td>
//                             <td>
//                                 <span className='badge badge-success badge-outline'>
//                                     {rider.status}
//                                 </span>
//                             </td>
//                             <td>
//                                 <button
//                                     className='btn btn-error btn-sm'
//                                     onClick={() => handleDeactivate(rider._id)}
//                                 >
//                                     Deactivate
//                                 </button>
//                             </td>
//                         </tr>)
//                     }
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default ActiveRiders;

import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../Hook/useAxiosSecure';
import Swal from 'sweetalert2';

const ActiveRiders = () => {
    const axiosSecure = useAxiosSecure();
    const { data: activeRiders = [], isLoading,refetch} = useQuery({
        queryKey: ['activeRiders'],
        queryFn: async () => {
            const res = await axiosSecure.get('/riders/active');
            return res.data;
        }
    });


    if (isLoading) {
        return 'Loading...'
    };

    console.log(activeRiders);


    const handleDeactivate = id =>{
        Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, deactivate it!"
}).then((result) => {
  if (result.isConfirmed) {

    axiosSecure.patch(`/riders/deactivate/${id}`)
    .then(res=>{
        if(res.data.modifiedCount){
    Swal.fire({
      title: "Deactivate!",
      text: "Rider has been deactivated.",
      icon: "success"
    });

    refetch();
        }
    })

  }
});
    }


    return (
        <div className='my-6'>
            <h3 className='text-2xl font-bold mx-3'>Active Riders</h3>

            <div className='overflow-x-auto'>
                <table className='table'>
                    {/* heading */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Region</th>
                            <th>District</th>
                            <th>Phone</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    {/* body */}
                    <tbody>
                        {
                            activeRiders.map((rider, index) => <tr key={rider._id}>
                                <td>{index + 1}</td>
                                <td>{rider.name}</td>
                                <td>{rider.region}</td>
                                <td>{rider.district}</td>
                                <td>{rider.phone}</td>
                                <td>
                                    <span className='badge badge-success badge-outline'>
                                        {rider.status} 
                                    </span>
                                </td>
                                <td>
                                    <button
                                    onClick={()=>handleDeactivate(rider._id)}
                                    className='btn btn-error btn-sm'>
                                        Deactivate
                                    </button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ActiveRiders;