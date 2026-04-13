import { QueryClient, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../../src/Context/AuthContext';
import useAxiosSecure from '../../../Hook/useAxiosSecure';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';

const MyParcels = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { data: parcels = [] } = useQuery({
        queryKey: ['my-parcels', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?email=${user.email}`);
            return res.data.data;
        }
    })

    console.log(parcels);

    const formatDate = (isoDate) => {
        return new Date(isoDate).toLocaleString(); // readable date
    };


    // pay
    const handlePay = id => {
        navigate(`/dashboard/payments/${id}`);
    }


    // delete
    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "This parcel will be permanently deleted!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#e11d48",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
        })

        if (result.isConfirmed) {
            try {
                const res = await axiosSecure.delete(`/parcels/${id}`)

                if (res.data.deletedCount > 0) {
                    console.log(res.data)
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: 'Parcel deleted successfully!',
                        showConfirmButton: false,
                        timer: 1500
                    });

                    queryClient.invalidateQueries('my-parcels', user?.email)
                }
            }
            catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Delete failed",
                    text: "Something went wrong!",
                });

            }

        }

    }


    return (
        <div className='overflow-x-auto'>
            <table className='table table-zebra w-full'>
                {/* header */}
                <thead>
                    <tr className='bg-base-200'>
                        <th>#</th>
                        <th>Title</th>
                        <th>Type</th>
                        <th>Created At</th>
                        <th>Cost</th>
                        <th>Payment Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                {/* body */}
                <tbody>
                    {
                        parcels.map((parcel, index) => <tr key={parcel.trackingId}>
                            <td >
                                {index + 1}
                            </td>

                            {/* title */}
                            <td className='capitalize font-semibold max-w-[180px] truncate'>
                                {parcel.title}
                            </td>

                            {/* type */}
                            <td className='capitalize font-semibold'>
                                {parcel.type}
                            </td>

                            {/* time */}
                            <td>
                                {formatDate(parcel.createdAt)}
                            </td>

                            {/* cost */}
                            <td className='font-bold'>
                                {parcel.cost} tk
                            </td>

                            {/* payment status */}
                            <td  >
                                <span className={` badge badge-sm ${parcel.payment_status === 'paid' ? "badge-success" : "badge-error"}`}>
                                    {parcel.payment_status}
                                </span>
                            </td>

                            {/* action */}
                            <td>
                                <div className='flex gap-2'>
                                    <button
                                        className="btn btn-sm btn-success"
                                    >View</button>

                                    <button
                                        onClick={()=>handlePay(parcel._id)}
                                        className="btn btn-sm btn-warning"
                                        disabled={parcel.payment_status === 'paid'}
                                    >Pay</button>

                                    <button
                                        onClick={() => handleDelete(parcel._id)}
                                        className="btn btn-sm btn-error"
                                    >Delete</button>
                                </div>
                            </td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default MyParcels;