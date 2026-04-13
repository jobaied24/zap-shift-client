// import React, { useContext, useState } from 'react';
// import { useQuery } from '@tanstack/react-query';
// import { AuthContext } from '../../../src/Context/AuthContext';
// import useAxiosSecure from '../../../Hook/useAxiosSecure';

// const MyEarnings = () => {
//   const { user } = useContext(AuthContext);
//   const axiosSecure = useAxiosSecure();
//   const [filter, setFilter] = useState('overall');

//   const { data: deliveries = [] } = useQuery({
//     queryKey: ['completedDeliveries', user?.email],
//     queryFn: async () => {
//       const res = await axiosSecure.get(
//         `/riders/completed_deliveries?email=${user.email}`
//       );
//       return res.data;
//     }
//   });

//   //  Date filter function
//   const filterByDate = (parcel) => {
//     const date = new Date(parcel.deliveredAt);
//     const now = new Date();

//     if (filter === 'today') {
//       return date.toDateString() === now.toDateString();
//     }

//     if (filter === 'week') {
//       const firstDay = new Date();
//       firstDay.setDate(now.getDate() - 6);
//       return date >= firstDay;
//     }

//     if (filter === 'month') {
//       return (
//         date.getMonth() === now.getMonth() &&
//         date.getFullYear() === now.getFullYear()
//       );
//     }

//     if (filter === 'year') {
//       return date.getFullYear() === now.getFullYear();
//     }

//     return true; // overall
//   };

//   const filteredData = deliveries.filter(filterByDate);

//   // 💰 Calculations
//   const totalEarnings = filteredData.reduce(
//     (sum, p) => sum + (p.earning || 0),
//     0
//   );

//   const totalCashedOut = filteredData.reduce(
//     (sum, p) => (p.isCashed_out ? sum + p.earning : sum),
//     0
//   );

//   const totalPending = filteredData.reduce(
//     (sum, p) => (!p.isCashed_out ? sum + p.earning : sum),
//     0
//   );

//   return (
//     <div className="p-6 space-y-6">
//       <h2 className="text-2xl font-bold">My Earnings</h2>

//       {/* Filter Buttons */}
//       <div className="flex gap-2 flex-wrap">
//         {['overall', 'today', 'week', 'month', 'year'].map(f => (
//           <button
//             key={f}
//             onClick={() => setFilter(f)}
//             className={`btn btn-sm ${filter === f ? 'btn-primary' : 'btn-outline'}`}
//           >
//             {f}
//           </button>
//         ))}
//       </div>


//       {/* Summary Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         <div className="bg-green-100 p-4 rounded-xl">
//           <h3>Total Earnings</h3>
//           <p className="text-xl font-bold">৳ {totalEarnings.toFixed(2)}</p>
//         </div>

//         <div className="bg-blue-100 p-4 rounded-xl">
//           <h3>Total Cashed Out</h3>
//           <p className="text-xl font-bold">৳ {totalCashedOut.toFixed(2)}</p>
//         </div>

//         <div className="bg-yellow-100 p-4 rounded-xl">
//           <h3>Pending Earnings</h3>
//           <p className="text-xl font-bold">৳ {totalPending.toFixed(2)}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MyEarnings;

import React, { useContext, useState } from 'react';
import useAxiosSecure from '../../../Hook/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../../src/Context/AuthContext';

const MyEarnings = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [filter, setFilter] = useState('overall');


  const { data: deliveries = [],isLoading } = useQuery({
    queryKey: ['completedDeliveries', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/riders/completed_deliveries?email=${user.email}`);
      return res.data;
    }
  });

if (isLoading) return <p>Loading...</p>;

  const filteredByDate = (parcel) => {
    const date = new Date(parcel.deliveredAt);
    const now = new Date();

    if (filter === 'today') {
      return date.toDateString() === now.toDateString();
    };

    if (filter === 'week') {
      const firstDay = new Date();
      firstDay.setDate(now.getDate() - 6);
      return date >= firstDay;
    };

    if (filter === 'month') {
      return (date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear()
      );
    };

    if (filter === 'year') {
      return date.getFullYear() === now.getFullYear();
    };

    return true;
  };

  const filteredData = deliveries.filter(filteredByDate);

  const totalEarnings = filteredData.reduce(
    (sum, p) => sum + (p.earning || 0),
    0
  );

  const totalCashedOut = filteredData.reduce(
    (sum, p) => (p.isCashed_out ? sum + (p.earning || 0) : sum),
    0
  );

  const totalPending = filteredData.reduce(
    (sum, p) => (!p.isCashed_out ? sum + (p.earning || 0) : sum),
    0
  );



  return (
    <div className='p-6'>
      <h2 className='text-2xl font-bold text-gray-700'>My Earnings</h2>

      {/* button */}
      <div className='flex gap-4 px-4 py-6'>
        {
          ['today', 'week', 'month', 'year', 'overall'].map(d =>
            <button key={d} onClick={() => setFilter(d)} className={`btn text-gray-700 ${filter === d ? 'btn-primary text-white' : ''}`}>
              {d}
            </button>
          )
        }
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 p-4'>

        {/* total pending */}
        <div className='bg-green-100 hover:bg-primary transition duration-300 hover:shadow-md p-4 rounded-2xl space-y-1'>
          <h3 className='text-gray-700'>Total Pending</h3>
          <p className='text-2xl font-bold text-gray-700'>{totalPending.toFixed(2)}
            <span className='text-lg ml-2  font-semibold'>tk</span>
          </p>
        </div>

        {/* total cashedOut */}
        <div className='bg-green-100 hover:bg-primary transition duration-300 hover:shadow-md p-4 rounded-2xl space-y-1'>
          <h3 className='text-gray-700'>Total cashedout</h3>
          <p className='text-2xl font-bold text-gray-700'>{totalCashedOut.toFixed(2)}
            <span className='text-lg ml-2  font-semibold'>tk</span>
          </p>
        </div>

        {/* totalEarning */}
        <div className='bg-green-100 hover:bg-primary transition duration-300 hover:shadow-md  p-4 rounded-2xl space-y-1'>
          <h3 className='text-gray-700'>Total Earning</h3>
          <p className='text-2xl font-bold text-gray-700'>{totalEarnings.toFixed(2)}
            <span className='text-lg ml-2  font-semibold'>tk</span>
          </p>
        </div>

      </div>
    </div>
  );
};

export default MyEarnings;