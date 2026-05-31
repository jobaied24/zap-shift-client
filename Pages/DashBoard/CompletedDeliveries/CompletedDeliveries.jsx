import React, { useContext } from 'react';
import { AuthContext } from '../../../src/Context/AuthContext';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hook/useAxiosSecure';
import Swal from 'sweetalert2';

const CompletedDeliveries = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const queryClient = useQueryClient();


    const { data: completedDeliveries = []} = useQuery({
        queryKey: ['completedDeliveries'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/riders/completed_deliveries?email=${user.email}`);
            return res.data;
        }
    });

    console.log(completedDeliveries);


const cashoutMutation =useMutation({
    mutationFn:async(parcelId)=>axiosSecure.patch(`/parcels/cashout/${parcelId}`),
    onSuccess:(res)=>{
    if(res.data.modifiedCount>0){
              Swal.fire({
                title: "Cashed out!",
                text: "Cashout successful",
                icon: "success",
                timer: 2000,
                showConfirmButton: false
              });

              queryClient.invalidateQueries({queryKey:['completedDeliveries']});
    }
       else{
                      Swal.fire({
                title: "Warning!",
                text: "No changes made.",
                icon: "warning"
              });
              } 
    
    },

    onError:(error)=>{
        console.log(error);

          Swal.fire({
            title: "Error!",
            text: "Failed to Cash out.",
            icon: "error"
          });
    }

})

    const handlecashout = (parcelId) =>{
         Swal.fire({
              title: "Are you sure?",
              text: "You won't be able to revert this!",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#CAEB66",
              cancelButtonColor: "#F87272",
              confirmButtonText: 'Confirm Cashout'
            }).then((result) => {
              if (result.isConfirmed) {
                
                cashoutMutation.mutate(parcelId);
              }
            });
    }
    return (
        <div className='p-6'>
            <h2 className='text-2xl font-bold text-gray-700'>Completed Deliveries</h2>
            <table class="table table-zebra w-full">
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Title</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Cost</th>
                        <th>Your Earning</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody className='font-semibold text-gray-700'>
                    {
                        completedDeliveries.map(p => <tr key={p._id}>
                            <td>{p.type}</td>
                            <td>{p.title}</td>
                            <td>{p.senderDistrict}</td>
                            <td>{p.receiverDistrict}</td>
                            <td>{p.cost} tk</td>
                            <td className='text-green-500'>{p.earning} tk</td>
                            
                            {/* action */}
                            <td>
                              {
                                p.isCashed_out === false &&
                                    (<button className='btn btn-success btn-sm' onClick={()=>handlecashout(p._id)}>Cash Out</button>
                                    )
                            }

                            {
                                p.isCashed_out === true && 
                                (<button className='badge badge-error badge-md' >cashed out</button>)
                            }
                            </td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default CompletedDeliveries;