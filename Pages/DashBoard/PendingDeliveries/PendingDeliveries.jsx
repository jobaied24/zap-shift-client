import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import useAxiosSecure from '../../../Hook/useAxiosSecure';
import { AuthContext } from '../../../src/Context/AuthContext';
import Swal from 'sweetalert2';

const PendingDeliveries = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);

    const { data: pendingDeliveries = [],refetch} = useQuery({
        queryKey: ['pendingDeliveries'],
        enabled: !!user.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/riders/pending_deliveries?email=${user.email}`);
            return res.data;
        }
    });

    console.log(pendingDeliveries);


    const pickedUpMutation = useMutation({
        mutationFn:async({parcelId})=> await axiosSecure.patch(`/parcels/pickedUp/${parcelId}`),
        onSuccess:(res)=>{
            console.log(res.data)
            if(res?.data?.modifiedCount>0){
            Swal.fire({
                    title: "Picked Up!",
                    text: "The parcel has marked as picked up successfully",
                    icon: "success",
                    timer: 2000,
                    showConfirmButton: false
                  });

                  refetch()
                }
                      else{
                              Swal.fire({
                        title: "Warning!",
                        text: " No changes made.",
                        icon: "warning"
                      });
                      }
        }
    });


    const deliveredMutation = useMutation({
        mutationFn:async({parcelId})=>await axiosSecure.patch(`/parcels/delivered/${parcelId}`),
          onSuccess:(res)=>{
            console.log(res.data)
            if(res?.data?.modifiedCount>0){
            Swal.fire({
                    title: "Delivered!",
                    text: "The parcel has been delivered successfully",
                    icon: "success",
                    timer: 2000,
                    showConfirmButton: false
                  });

                  refetch()
                }
                      else{
                              Swal.fire({
                        title: "Warning!",
                        text: " No changes made.",
                        icon: "warning"
                      });
                      }
        }
    })


    // pickup
    const handlePickUp = ({parcelId}) =>{
  Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#CAEB66",
      cancelButtonColor: "#F87272",
      confirmButtonText: 'Mark as picked up'
    }).then((result) => {
      if (result.isConfirmed) {
        
        pickedUpMutation.mutate({parcelId})
      }
    });
    };



    // delivered
    const handleDelivered = ({parcelId}) =>{
         Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#CAEB66",
      cancelButtonColor: "#F87272",
      confirmButtonText: 'Mark as delivered'
    }).then((result) => {
      if (result.isConfirmed) {
        
        deliveredMutation.mutate({parcelId})
      }
    });
    }

    return (
        <div className='p-6'>
            <h2 className='text-2xl font-bold text-gray-700'>Pending Deliveries</h2>
            <table class="table table-zebra w-full">
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Title</th>
                        <th>Sender Address</th>
                        <th>Reciever Address</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        pendingDeliveries.map(p => <tr key={p._id}>
                            <td>{p.type}</td>
                            <td>{p.title}</td>
                            <td>{p.SenderAddress}</td>
                            <td>{p.receiverAddress}</td>
                            
                            <td>
                              {
                                p.delivery_status === 'rider_assigned' &&
                                    (<button className='btn btn-success btn-sm' onClick={()=>handlePickUp({parcelId:p._id})}>Picked Up</button>
                                    )
                            }

                            {
                                p.delivery_status === 'in_transit' && 
                                (<button className='btn btn-success btn-sm' onClick={()=>handleDelivered({parcelId:p._id})}>Delivered</button>)
                            }
                            </td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default PendingDeliveries;