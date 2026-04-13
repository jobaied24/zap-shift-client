import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useLoaderData, useNavigate } from 'react-router';
import useAxiosSecure from '../../../Hook/useAxiosSecure';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../src/Context/AuthContext';

// const warehouseData = [
//   { region: "Dhaka", serviceCenters: ["Dhaka North", "Dhaka South", "Gazipur"] },
//   { region: "Chittagong", serviceCenters: ["Chittagong City", "Cox's Bazar"] },
// ];

const SendParcel = () => {
  const { register, watch, handleSubmit, formState: { errors } } = useForm();
  const warehouseData = useLoaderData();
  const uniqueRegion = [...new Set(warehouseData.map(w => w.region))];
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const parcelType = watch("type");
  const senderRegion = watch("senderRegion");
  const receiverRegion = watch("receiverRegion");
  const weight = Number(watch(("weight") || 0));
  const navigate = useNavigate();

  const onSubmit = (data) => {
    const trackingId = crypto.randomUUID();

    let cost = 0;
    const isWithinCity = senderRegion === receiverRegion;
    if (parcelType === "document") {
      cost = isWithinCity ? 60 : 80;
    }

    if (parcelType === "non-document" && weight <= 3) {
      cost = isWithinCity ? 110 : 150
    }

    if (parcelType === "non-document" && weight > 3) {
      const extraWeight = weight - 3;
      cost = isWithinCity ? 110 + (extraWeight * 40) : 150 + (extraWeight * 40) + 40;
    };

    const basePrice = parcelType === "document" ?
      (isWithinCity ? 60 : 80)
      : (isWithinCity ? 110 : 150);

    const extraWt = weight > 3 ? weight - 3 : 0;

    const extraWeightCost = extraWt * 40;
    const outSideExtra = (!isWithinCity && weight > 3) ? 40 : 0;

    // toast
    Swal.fire({
      title: 'Payment Summery',
      html: `
          <div style="text-align:left;font-size:14px">
        <p><b>Parcel Type:</b>${parcelType}</p>
        <p><b>Delivery:</b>${isWithinCity ? "Within City" : "Outside City"}</p>
        <p><b>Weight:</b>${weight}</p>
        <hr style="margin:16px 0px"/>
        <p><b>Base Price:৳</b>${basePrice}</p>
        ${extraWt > 0 ? `<p>Extra Weight Cost:</p>${extraWt}kg × ৳40=${extraWeightCost}` : ""}
        ${outSideExtra > 0 ? `<p>Outside City Charge: ৳${outSideExtra}</p>` : ""}
        <hr style="margin:16px 0px"/>
        <h3 style="color:#16a34a;font-weight:semi-bold;font-size:15px"><b>Total: ৳${cost}</b></h3>
      </div>
    `,
      showCancelButton: true,
      confirmButtonText: "Proceed Payment",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#16a34a",
    })
      .then((result) => {
        if (result.isConfirmed) {

          const parcelData = {
            ...data,
            createdAt: new Date().toISOString(),
            delivery_status: 'not_collected',
            payment_status: 'unpaid',
            createdBy:user.email,
            cost,
            trackingId
          };


          axiosSecure.post('/parcels',parcelData)
          .then(res=>{
            console.log(res.data);
            if(res.data.insertedId){
              Swal.fire({
  position: "top-end",
  icon: "success",
  title: 'Redirecting..',
  text:'Proceeding to payment gatway',
  showConfirmButton: false,
  timer: 1500
});

navigate('/dashboard/myParcels')
            }
          })


      console.log("Submitted Parcel:", parcelData);
        }
      })
  }

  return (
    <div className='max-w-4xl mx-auto p-6 '>

      <h1 className='text-3xl font-bold mb-2 text-center'>Send Parcel</h1>
      <p className="text-gray-500 mb-6 text-center">
        Door to Door Delivery System - Pickup & Delivery Required
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>

        <div className='card bg-base-100 p-4 shadow-md'>
          <div className='text-xl font-semibold mb-4 text-center'>Parcel Info</div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>

            {/* type */}
            <div className='form-control mb-3'>
              <label className='label font-medium items-center mb-2'>Type</label>
              <div className='flex gap-10'>
                {/* document */}
                <div className='flex items-center justify-center'>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type='radio'
                      value='document'
                      className='radio radio-primary'
                      {...register('type', { required: true })}
                    />
                    <span>Document</span>
                  </label>

                </div>

                {/* non-document */}
                <div className='flex items-center justify-center'>
                  <label className="flex gap-2 items-center cursor-pointer">
                    <input
                      type='radio'
                      value='non-document'
                      className='radio radio-primary'
                      {...register('type', { required: true })}
                    />
                    <span>Non-document</span>
                  </label>

                </div>
              </div>
              {errors.type && <span className='text-error'>select parcel type</span>}
            </div>

            {/* title */}
            <div className="form-control mb-3">
              <label className='label items-center mb-2'>Title</label>
              <input
                type="text"
                className='input input-bordered '
                {...register('title', { required: true })}
              />
              {errors.title && <span className='text-error'>title is required</span>}
            </div>

            {/* weight */}
            {
              parcelType === "non-document" && (
                <div className='form-control'>
                  <label className='label items-center mb-2'>Weight(kg)</label>
                  <input
                    type='number'
                    className='input input-bordered'
                    {...register('weight')}
                  />
                </div>
              )
            }

          </div>
        </div>

        {/* sender and receiver info */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-2'>

          {/* sender info */}
          <div className='card bg-base-100 shadow-md'>
            <div className='card-body'>
              <h1 className='text-xl font-semibold mb-4 '>Sender Info</h1>

              <div className='grid grid-cols-1 gap-4'>
                {/* sender name */}
                <input
                  className='input input-bordered w-full'
                  placeholder='Sender Name'
                  {...register('senderName', { required: true })}
                />

                {/* sender number */}
                <input
                  className='input input-bordered w-full'
                  placeholder='Contact Number'
                  {...register('SenderContact', { required: true })}
                />

                {/* sender region */}
                <select
                  className='select selected-border w-full'

                  {...register('senderRegion', { required: true })}
                >
                  <option value="">Select Region</option>
                  {
                    uniqueRegion.map(region => <option key={region} value={region}>{region}</option>)
                  }
                </select>

                {/* sender district */}
                <select
                  className='select selected-border w-full'
                  {...register('senderDistrict', { required: true })}
                >
                  <option value="">Select District</option>
                  <option></option>
                  {
                    warehouseData.filter(w => w.region === senderRegion).map(w => <option key={w.district} value={w.district}>{w.district}</option>)
                  }
                </select>

                {/* sender address */}
                <input
                  className='input input-bordered w-full'
                  placeholder='Address'
                  {...register('SenderAddress', { required: true })}
                />

                {/* pick up instruction */}
                <textarea
                  className='textarea w-full'
                  placeholder='Pick up instruction'
                  {...register('PickUpInstruction', { required: true })}
                >

                </textarea>
              </div>

            </div>
          </div>


          {/* receiver info */}
          <div className='card bg-base-100 shadow-md'>
            <div className='card-body'>
              <h1 className='text-xl font-semibold mb-4 '>receiver Info</h1>

              <div className='grid grid-cols-1 gap-4'>
                {/* receiver name */}
                <input
                  className='input input-bordered w-full'
                  placeholder='Receiver Name'
                  {...register('receiverName', { required: true })}
                />

                {/* receiver number */}
                <input
                  className='input input-bordered w-full'
                  placeholder='Contact Number'
                  {...register('receiverContact', { required: true })}
                />

                {/* receiver region */}
                <select
                  className='select selected-border w-full'

                  {...register('receiverRegion', { required: true })}
                >
                  <option value="">Select Region</option>
                  {
                    uniqueRegion.map(region => <option key={region} value={region}>{region}</option>)
                  }

                </select>

                {/* recevier district */}
                <select
                  className='select selected-border w-full'
                  {...register('receiverDistrict', { required: true })}
                >
                  <option value="">Select District</option>
                  {
                    warehouseData.filter(w => w.region === receiverRegion).map(w => <option key={w.district} value={w.district}>{w.district}</option>)
                  }
                </select>

                {/* receiver address */}
                <input
                  className='input input-bordered w-full'
                  placeholder='Address'
                  {...register('receiverAddress', { required: true })}
                />

                {/* pick up instruction */}
                <textarea
                  className='textarea w-full'
                  placeholder='Delivery instruction'
                  {...register('PickUpInstruction', { required: true })}
                >

                </textarea>
              </div>

            </div>
          </div>

        </div>
        <button className='btn btn-primary text-white w-full'>
          Submit Parcel
        </button>
      </form>
    </div>
  );
};

export default SendParcel;