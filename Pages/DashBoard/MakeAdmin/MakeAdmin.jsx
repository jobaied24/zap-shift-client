// import { useState } from "react";
// import useAxiosSecure from "../../../Hook/useAxiosSecure";


// const MakeAdmin = () => {

//   const axiosSecure = useAxiosSecure();

//   const [search, setSearch] = useState("");
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // 🔍 Search users
//   const handleSearch = async () => {

//     if (!search) return;

//     setLoading(true);

//     const res = await axiosSecure.get(`/users/search?email=${search}`);

//     setUsers(res.data);

//     setLoading(false);
//   };

//   // ⭐ Make Admin
//   const handleMakeAdmin = async (id) => {

//     await axiosSecure.patch(`/users/make-admin/${id}`);

//     // update UI instantly
//     setUsers(prev =>
//       prev.map(u =>
//         u._id === id ? { ...u, role: "admin" } : u
//       )
//     );
//   };

//   // ❌ Remove Admin
//   const handleRemoveAdmin = async (id) => {

//     await axiosSecure.patch(`/users/remove-admin/${id}`);

//     setUsers(prev =>
//       prev.map(u =>
//         u._id === id ? { ...u, role: "user" } : u
//       )
//     );
//   };

//   return (

//     <div className="p-4">

//       <h2 className="text-xl font-bold mb-4">Manage Admin</h2>

//       {/* Search Box */}
//       <div className="flex gap-2 mb-4">
//         <input
//           type="text"
//           placeholder="Search by email..."
//           className="input input-bordered w-full"
//           onChange={(e) => setSearch(e.target.value)}
//         />
//         <button
//           onClick={handleSearch}
//           className="btn btn-primary"
//         >
//           Search
//         </button>
//       </div>

//       {/* Loading */}
//       {loading && <p>Searching...</p>}

//       {/* Results */}
//       <div className="space-y-3">

//         {users.length === 0 && !loading && (
//           <p className="text-gray-500">No users found</p>
//         )}

//         {users.map(user => (

//           <div
//             key={user._id}
//             className="border p-3 rounded flex justify-between items-center"
//           >

//             <div>
//               <p className="font-medium">{user.email}</p>
//               <p className="text-sm text-gray-500">
//                 Joined: {user.created_at}
//               </p>
//               <p className="text-sm">
//                 Role: <span className="font-semibold">
//                   {user.role || "user"}
//                 </span>
//               </p>
//             </div>

//             <div>
//               {user.role === "admin" ? (
//                 <button
//                   onClick={() => handleRemoveAdmin(user._id)}
//                   className="btn btn-error btn-sm"
//                 >
//                   Remove Admin
//                 </button>
//               ) : (
//                 <button
//                   onClick={() => handleMakeAdmin(user._id)}
//                   className="btn btn-success btn-sm"
//                 >
//                   Make Admin
//                 </button>
//               )}
//             </div>

//           </div>

//         ))}

//       </div>

//     </div>
//   );
// };

// export default MakeAdmin;



import React, { useState } from 'react';
import useAxiosSecure from '../../../Hook/useAxiosSecure';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Swal from 'sweetalert2';

const MakeAdmin = () => {
    const [search, setSearch] = useState('');
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const { data: admin = [], isLoading, refetch } = useQuery({
        queryKey: ['admin', search],
        enabled: false,
        queryFn: async () => {
            const result = await axiosSecure.get(`/users/search?email=${search}`);
            return result.data;
        }
    });

    // Make Admin mutation
    // const makeAdminMutation = useMutation({
    //     mutationFn: (id) => axiosSecure.patch(`/users/makeAdmin/${id}`),
    //     onSuccess: () => {
    //         Swal.fire({
    //             title: "Admin Updated!",
    //             text: "The user has been promoted to admin.",
    //             icon: "success"
    //         });

    //         // refetch data
    //         refetch();
    //     }

    // });


    const makeAdminMutation = useMutation({
        mutationFn: (id) => axiosSecure.patch(`/users/makeAdmin/${id}`),
        onSuccess: () => {
            Swal.fire({
                title: "Admin Updated!",
                text: "The user has been promoted to admin.",
                icon: "success"
            });

            //   refetch
            refetch();
        }



    })




    // remove admin mutation
    const removeAdminMutation = useMutation({
        mutationFn: (id) => axiosSecure.patch(`/users/removeAdmin/${id}`),

        onSuccess: () => {
            Swal.fire({
                title: "Admin Updated!",
                text: "The user is no longer an admin.",
                icon: "success"
            });

            // refetch
            refetch();
        }
    })


    const handleSearchAdmin = () => {
        refetch();
    };

    if (isLoading) {
        return 'Loading...'
    };


    // make admin
    const handleMakeAdmin = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#CAEB66",
            cancelButtonColor: "#F87272",
            confirmButtonText: "Yes, make admin!"
        }).then((result) => {
            if (result.isConfirmed) {

                makeAdminMutation.mutate(id);
            }
        });
    };


    // remove admin
    const handleRemoveAdmin = async (id) => {
        console.log(id);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#CAEB66",
            cancelButtonColor: "#F87272",
            confirmButtonText: "Yes, remove admin!"
        }).then((result) => {
            if (result.isConfirmed) {
                removeAdminMutation.mutate(id);
            }
        });

    }

    console.log(admin)
    return (
        <div className='px-10 py-6'>
            <h2 className='text-2xl font-bold mb-3'>Manage Admin</h2>
            <div className='flex gap-2'>
                <input type="text"
                    placeholder='Search by email'
                    className='input w-full'
                    onChange={(e) => setSearch(e.target.value)}
                />

                <button className='btn btn-primary text-white' onClick={() => handleSearchAdmin()}>search</button>
            </div>

            <div className='my-8 grid grid-cols-1 gap-3 text-gray-800'>

                {
                    admin.length === 0 && !isLoading && (<p className="text-gray-500">No users found</p>)
                }

                {
                    admin.map(a => <div key={a._id} className='border-2 border-primary p-4 rounded-md flex justify-between items-center'>
                        <div className='space-y-1'>
                            <p className='font-medium'>Email : {a.email}</p>
                            <p className='text-sm'><span className='font-medium'>
                                role :
                            </span>{a.role}</p>
                            <p className='text-sm'>
                                <span className='font-medium'>
                                    Joined :
                                </span>
                                {new Date(a.create_at).toLocaleString()}</p>
                        </div>
                        {
                            a.role === 'admin' ?

                                <button
                                    onClick={() => handleRemoveAdmin(a._id)}
                                    className='btn btn-error'>Remove Admin</button>
                                :
                                <button
                                    onClick={() => handleMakeAdmin(a._id)}
                                    className='btn btn-primary text-white'>Make Admin</button>

                        }


                    </div>)
                }

            </div>
        </div>
    );
};

export default MakeAdmin;