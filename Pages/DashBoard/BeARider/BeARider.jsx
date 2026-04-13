// import React, { useContext } from 'react';
// import { useForm, useWatch } from 'react-hook-form';
// import { AuthContext } from '../../../src/Context/AuthContext';
// import { useLoaderData } from 'react-router';
// import useAxiosSecure from '../../../Hook/useAxiosSecure';

// const BeARider = () => {
//   const { register, handleSubmit, control } = useForm();
//   const { user } = useContext(AuthContext);
//   const axiosSecure = useAxiosSecure();
//   const warehouseData = useLoaderData();
//   // const region = warehouseData.map(w=>w.region);
//   const uniqueRegion = [...new Set(warehouseData.map(w => w.region))];
//   console.log(uniqueRegion);
//   const region = useWatch({ control, name: 'region' });

//   const onSubmit = data => {

//     const riderData = {
//       ...data,
//       name:user.displayName || '',
//       email:user.email || '',
//       status:'pending',
//       create_at:new Date().toISOString()
//     };
//     console.log(riderData);

//     axiosSecure.post('/riders',riderData)
//     .then(res=>{
//       if(res.data.insertedId){
//         console.log('rider appliction submitted successfully')
//       }
//     })
//   }

//   return (
//     <div className='max-w-6xl mx-auto p-6'>
//       <h1 className='text-3xl font-bold text-center mb-2'>
//         Become a Rider
//       </h1>

//       <p className='text-center text-gray-600 mb-6'>
//         Fill the form to apply as delivery rider
//       </p>

//       <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
//         <div className='card bg-base-100 p-6 shadow-md'>
//           <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>

//             {/* name */}
//             <div>
//               <label className='label'>Name</label>
//               <input
//                 className='input input-bordered w-full'
//                 value={user.displayName || ''}
//                 readOnly
//               >
//               </input>
//             </div>


//             {/* email */}
//             <div>
//               <label className='label'>Email</label>
//               <input
//                 className='input input-bordered w-full'
//                 value={user.email || ''}
//                 readOnly
//               >
//               </input>
//             </div>


//             {/* age */}
//             <div>
//               <label className='label'>Age</label>
//               <input
//                 className='input input-bordered w-full'
//                 type='number'
//                 placeholder='Age'
//                 {...register('age', { required: true })}
//               >
//               </input>
//             </div>


//             {/* phone */}
//             <div>
//               <label className='label'>Phone</label>
//               <input
//                 className='input input-bordered w-full'
//                 placeholder='Phone'
//                 type='text'
//                 {...register('phone', { required: true })}
//               >
//               </input>
//             </div>


//             {/* NID */}
//             <div>
//               <label className='label'>NID number</label>
//               <input
//                 className='input input-bordered w-full'
//                 placeholder='NID number'
//                 {...register('nid', { required: true })}
//               >
//               </input>
//             </div>


//             {/* bike brand */}
//             <div>
//               <label className='label'>Bike brand</label>
//               <input
//                 className='input input-bordered w-full'
//                 placeholder='Bike brand'
//                 type='text'
//                 {...register('bikeBrand', { required: true })}
//               >
//               </input>
//             </div>


//             {/* bike registration */}
//             <div>
//               <label className='label'>Bike registration</label>
//               <input
//                 className='input input-bordered w-full'
//                 placeholder='Bike registration'
//                 type='text'
//                 {...register('bikeRegistration', { required: true })}
//               >
//               </input>
//             </div>

//             {/* Region */}
//             <div>
//               <label className='label'>Region</label>
//               <select
//                 className='select select-bordered w-full'
//                 {...register('region', { required: true })}
//               >
//                 <option>select a region</option>
//                 {
//                   uniqueRegion.map(region => <option key={region} value={region}>
//                     {region}
//                   </option>)
//                 }
//               </select>
//             </div>


//             {/* district */}
//             <div>
//               <label className='label'>District</label>
//               <select
//                 className='select select-bordered w-full'
//                 {...register('district', { required: true })}
//               >
//                 <option value="">select District</option>
//                 {
//                   warehouseData.filter(w => w.region === region).map(w =>
//                     <option key={w.district} value={w.district}>{w.district}</option>
//                   )
//                 }
//               </select>
//             </div>
//           </div>

//           {/* submit button */}
//           <button className='btn btn-primary text-white mt-6'>
//             Submit Application
//           </button>
//         </div>

//       </form>
//     </div>
//   );
// };

// export default BeARider;



import React, { useContext } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { AuthContext } from '../../../src/Context/AuthContext';
import { useLoaderData } from 'react-router';
import useAxiosSecure from '../../../Hook/useAxiosSecure';
import Swal from 'sweetalert2';

const BeARider = () => {
  const {register,control,handleSubmit} = useForm();
  const {user}=useContext(AuthContext);
  const warehouseData = useLoaderData();
  const uniqueRegion = [...new Set(warehouseData.map(w=>w.region))];
  console.log(uniqueRegion);
  const region = useWatch({control,name:'region'});
  console.log(region);
  const axiosSecure = useAxiosSecure();


  const onSubmit = data =>{
   const riderData = {
    ...data,
    name:user.displayName || '',
    email:user.email || '',
    status:'pending',
    create_at:new Date().toISOString()
   };
   console.log(riderData)

   axiosSecure.post('/riders',riderData)
   .then(res=>{
    if(res.data.insertedId){
      Swal.fire({
  position: "top-end",
  icon: "success",
  title: 'Rider appliction submitted successfully',
  showConfirmButton: false,
  timer: 1500
});
    }
   })
  }

  return (
    <div className='max-w-4xl mx-auto p-6'>
      <h1 className='text-3xl font-bold mb-2 text-center'>Be a Ridaer</h1>
      <p className='text-center mb-6 text-gray-600'>Fill the form to apply as delivery rider</p>
    
     <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
        <div className='card shadow-2xl bg-base-100 p-6 my-8'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {/* name */}
            <input 
            type="text" 
             className='input  w-full'
             placeholder='Name'
             value={user.displayName || ''}
             readOnly
            />

            {/* email */}
            <input 
            type="email" 
             className='input  w-full'
             placeholder='email'
             value={user.email || ''}
             readOnly
            />

             {/* age */}
             <input 
             type="number"
             placeholder='age'
             className='input input-border w-full'
             {...register('Age',{required:true})}
             />

             {/* phone */}
             <input 
             type="text"
             placeholder='Phone'
             className='input input-border w-full'
             {...register('phone',{required:true})}
             />

             {/* NID */}
             <input 
             type="text"
             placeholder='NID number'
             className='input input-border w-full'
             {...register('nid',{required:true})}
             />

             {/* Bike brand */}
             <input 
             type="text"
             placeholder='Bike brand'
             className='input input-border w-full'
             {...register('bikeBrand',{required:true})}
             />

             {/* Bike registration */}
             <input 
             type="text"
             placeholder='Bike registration number'
             className='input input-border w-full'
             {...register('bikeRegistration',{required:true})}
             />

             {/* region */}
            <select className='select w-full'
            {...register('region',{required:true})}
            >
              <option value="">select a region</option>
              {
                uniqueRegion.map(region=><option key={region} value={region}>
                  {region}
                </option>)
              }
            </select>

            {/* district */}
            <select className='select w-full'
            {...register('district',{required:true})}
            >
              <option value="">select a district</option>
              {
                warehouseData.filter(w=>w.region === region).map(w=><option key={w.district}>
                  {w.district}
                </option>)
              }
            </select>
          </div>
          {/* submit button */}
          <button
          className='btn btn-primary w-full text-white mt-10'
          >Submit Application</button>
        </div>
      </form>
    </div>
  );
};

export default BeARider;