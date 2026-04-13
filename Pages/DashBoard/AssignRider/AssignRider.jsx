import React, { useState } from 'react';
import useAxiosSecure from '../../../Hook/useAxiosSecure';
import { useMutation, useQuery } from "@tanstack/react-query";
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import Swal from 'sweetalert2';


const AssignRider = () => {
  const axiosSecure = useAxiosSecure();
  // const [modalOpen,setModalOpen]=useState(false);
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [filteredRiders, setFilteredRiders] = useState([]);


  const { data: parcels = [], isLoading, refetch } = useQuery({
    queryKey: ['parcels', 'AssignRiders'],
    queryFn: async () => {
      const res = await axiosSecure.get('/parcels?delivery_status=not_collected&payment_status=paid');
      return res.data.data;
    }
  });

  const { data: activeRiders = [] } = useQuery({
    queryKey: ['allActiveRiders'],
    queryFn: async () => {
      const res = await axiosSecure.get('/riders/active');
      return res.data;
    }
  });


  // assignRiderMutation
  const assignRiderMutation = useMutation({
    mutationFn: ({ parcelId, riderId, riderName,riderEmail }) => axiosSecure.patch('/riders/assignRider', { parcelId, riderId, riderName,riderEmail }),
    onSuccess: (res) => {
      const data = res?.data;

      if(data?.parcelModified>0 && data?.riderModified>0){
      Swal.fire({
        title: "Assigned!",
        text: "The rider has been assigned successfully",
        icon: "success",
        timer: 2000,
        showConfirmButton: false
      });

      refetch();
      }
      else{
              Swal.fire({
        title: "Warning!",
        text: "Assignment failed or no changes made.",
        icon: "warning"
      });
      }    
    },

    onError: (error) => {
      console.log(error);

      Swal.fire({
        title: "Error!",
        text: "Failed to assign rider.",
        icon: "error"
      });
    }

  })


  if (isLoading) {
    return <p>Loading...</p>
  }

  const handleAssignClick = (parcel) => {
    console.log('click', parcel._id);
    const riders = activeRiders.filter(rider => rider.district === parcel.senderDistrict);
    console.log(riders);
    console.log(activeRiders)
    console.log(parcel.senderDistrict);
    // setModalOpen(true);
    setFilteredRiders(riders);
    setSelectedParcel(parcel);
  };


  const handleAssignrider = (parcelId, riderId, riderName,riderEmail) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#CAEB66",
      cancelButtonColor: "#F87272",
      confirmButtonText: `Yes, assign ${riderName}!`
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(riderName)
        assignRiderMutation.mutate({ parcelId, riderId, riderName,riderEmail });
      }
    });
  }


  return (
    <div className='py-6'>
      <h2 className='text-2xl font-bold text-gray-700'>Assign Riders</h2>
      <div className='overflow-x-auto'>
        {/* table */}
        <table className='table w-full'>
          {/* heading */}
          <thead>
            <tr>
              <th>Tracking ID</th>
              <th>Pickup</th>
              <th>Delivery</th>
              <th>Cost</th>
              <th>Status</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>

          {/* body */}
          <tbody>
            {
              parcels.map(p => <tr key={p._id}>

                {/* trackingId  */}
                <td className='text-xs'>{p.trackingId}</td>

                {/* pickup */}
                <td data-tooltip-id={`pickup-${p._id}`} data-tooltip-content={`Sender: ${p.senderName}`} className='text-sm'>
                  <p>{p.senderDistrict}</p>
                  <p className='text-xs text-gray-600'>{p.SenderAddress}</p>
                </td>

                {/* Delivery */}
                <td data-tooltip-id={`delivery-${p._id}`} data-tooltip-content={`Receiver: ${p.receiverName}`} className='text-sm'>
                  <p>{p.receiverDistrict}</p>
                  <p className='text-xs text-gray-600'>{p.receiverAddress}</p>
                </td>

                {/* cost */}
                <td className='text-sm'>$ {p.cost}</td>

                {/* Status */}
                <td className='space-y-1'>
                  <span className='badge badge-outline badge-success text-xs'>{p.payment_status}</span>
                  <span className='badge badge-outline badge-warning text-xs'>{p.delivery_status}</span>
                </td>

                {/* date */}
                <td className='text-sm'>{new Date(p.createdAt).toLocaleDateString()}</td>

                {/* Action */}
                <td>
                  <label htmlFor='assign_modal' onClick={() => handleAssignClick(p)} className='btn btn-primary btn-sm text-white whitespace-nowrap'>Assign Rider</label>
                </td>

                {/* tooltip */}
                <Tooltip id={`pickup-${p._id}`} place='top' />
                <Tooltip id={`delivery-${p._id}`} place='top' />
              </tr>)
            }
          </tbody>
        </table>

        {/* Modal */}
        <input type="checkbox" id='assign_modal' className='modal-toggle' />
        <div className='modal' id='assign_modal' >
          <div className='modal-box'>
            {/* {
                    filteredRiders &&          
               } */}

            <div className='m-2'>
              <h3 className='text-xl font-bold mb-2'>Available Riders</h3>
              <table className='table w-full'>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Bike</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {
                    filteredRiders.map(rider => <tr key={rider._id}>
                      <td>{rider.name}</td>
                      <td>{rider.phone}</td>
                      <td>{rider.bikeBrand}</td>
                      <td>
                        <button onClick={() => handleAssignrider(selectedParcel._id, rider._id, rider.name,rider.email)} className='btn btn-sm btn-success'>Assign</button>
                      </td>
                    </tr>)
                  }
                </tbody>
              </table>
            </div>

            <div className='modal_action flex justify-end mt-8 mx-4 '>
              <label htmlFor="assign_modal" className='btn btn-primary w-full text-white'>close</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignRider;

