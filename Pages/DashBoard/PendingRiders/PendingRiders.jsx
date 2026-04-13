
import React, { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hook/useAxiosSecure';
import Swal from 'sweetalert2';

const PendingRiders = () => {
    const axiosSecure = useAxiosSecure();
    const [selectedRider, setSelectedRider] = useState(null);
    const queryClient = useQueryClient();

    const { data: pendingRiders = [], isLoading, refetch } = useQuery({
        queryKey: ['pendingRiders'],
        queryFn: async () => {
            const result = await axiosSecure.get('/riders/pending');
            return result.data;
        }
    });

    if (isLoading) {
        return 'Loading...'
    };

    console.log(pendingRiders);

    // approve
    const handleApprove = (id, email) => {
        console.log('email: ', email)
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#CAEB66",
            cancelButtonColor: "#F87272",
            confirmButtonText: "Yes, approve it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/riders/approve/${id}`, { email })
                    .then(res => {
                        if (res.data.modifiedCount) {
                            Swal.fire({
                                title: "Approved!",
                                text: "Rider has been approved.",
                                icon: "success"
                            });
                            refetch();
                            queryClient.invalidateQueries(['role'])
                        }
                    })
            }
        });

    }

    // reject
    const handleReject = id => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, reject it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/riders/reject/${id}`)
                    .then(res => {
                        if (res.data.modifiedCount) {
                            Swal.fire({
                                title: "Rejected!",
                                text: "Rider has been rejected.",
                                icon: "success"
                            });
                        }

                        refetch();
                    })

            }
        });
    }

    return (
        <div className='my-6'>
            <h1 className='text-2xl mx-3 mb-6 font-bold'>Pending Riders</h1>
            <div className='overflow-x-auto'>
                {/* table */}
                <table className='table'>
                    {/* heading */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Region</th>
                            <th>Phone</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    {/* body */}
                    <tbody>
                        {
                            pendingRiders.map((rider, index) =>
                                <tr key={rider._id}>
                                    <td>{index + 1}</td>
                                    <td>{rider.name}</td>
                                    <td>{rider.email}</td>
                                    <td>{rider.region}</td>
                                    <td>{rider.phone}</td>
                                    <td className='flex gap-2'>

                                        {/* view button */}
                                        <label htmlFor='rider_modal'
                                            onClick={() => setSelectedRider(rider)}
                                            className='btn btn-info btn-sm'>View</label>


                                        {/* approve button */}
                                        <button
                                            onClick={() => handleApprove(rider._id, rider.email)}
                                            className='btn btn-success btn-sm'>Approve</button>


                                        {/* reject button */}
                                        <button
                                            onClick={() => handleReject(rider._id)}
                                            className='btn btn-error btn-sm'>Reject</button>
                                    </td>
                                </tr>)
                        }

                    </tbody>
                </table>

                {/* modal  */}
                <input type="checkbox" id='rider_modal' className='modal-toggle' />
                <div className='modal'>
                    <div className='modal-box'>
                        <h3 className='text-2xl font-bold text-center text-gray-700 mb-6'>Rider Information</h3>
                        {
                            selectedRider && (
                                <div className='grid grid-cols-1 md:grid-cols-2 text-sm gap-6 my-4 mx-2'>
                                    <div>
                                        <p className='font-medium'>Name:</p>
                                        <p>{selectedRider.name}</p>
                                    </div>

                                    <div>
                                        <p className='font-medium'>Email:</p>
                                        <p>{selectedRider.email}</p>
                                    </div>

                                    <div>
                                        <p className='font-medium'>Age:</p>
                                        <p>{selectedRider.age}</p>
                                    </div>

                                    <div>
                                        <p className='font-medium'>Phone:</p>
                                        <p>{selectedRider.phone}</p>
                                    </div>

                                    <div>
                                        <p className='font-medium'>NID:</p>
                                        <p>{selectedRider.nid}</p>
                                    </div>

                                    <div>
                                        <p className='font-medium'>Bike brand:</p>
                                        <p>{selectedRider.bikeBrand}</p>
                                    </div>

                                    <div>
                                        <p className='font-medium'>Bike registration:</p>
                                        <p>{selectedRider.bikeRegistration}</p>
                                    </div>

                                    <div>
                                        <p className='font-medium'>Region:</p>
                                        <p>{selectedRider.region}</p>
                                    </div>

                                    <div>
                                        <p className='font-medium'>District:</p>
                                        <p>{selectedRider.district}</p>
                                    </div>

                                    <div>
                                        <p className='font-medium'>status:</p>
                                        <p>{selectedRider.status}</p>
                                    </div>
                                </div>
                            )
                        }

                        <div className='modal-action mx-2 mt-8'>
                            <label htmlFor="rider_modal" className='btn btn-primary w-full text-white'>Close</label>
                        </div>

                    </div>
                </div>

            </div>

        </div>
    );
};

export default PendingRiders;