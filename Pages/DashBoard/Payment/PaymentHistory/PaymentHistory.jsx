
import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../../../src/Context/AuthContext';
import useAxiosSecure from '../../../../Hook/useAxiosSecure';

const PaymentHistory = () => {
    const {user} = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

        const {isPending,data:payments=[]} = useQuery({
            queryKey:['payments',user?.email],
            queryFn:async()=>{
                const res = await axiosSecure.get(`/payments?email=${user.email}`);
                return res.data;
            }
        });
        console.log(payments);
        if(isPending){
            return 'loading...'
        }
    return (
        <div className='overflow-x-auto py-2'>
          <table className='table table-zebra'>
           <thead>
               <tr>
                <th>#</th>
                <th>Parcel Id</th>
                <th>Transaction Id</th>
                <th>payment Method</th>
                <th>Amount</th>
                <th>Payment Date</th>
               </tr>
           </thead>
           <tbody>
              {
                payments.map((payment,index)=><tr key={payment._id}>
                    <td>{index+1}</td>
                    <td className='text-xs text-gray-800'>{payment.parcelId}</td>
                    <td className='text-xs text-gray-800'>{payment.transactionId}</td>
                    <td >
                        <span className='badge badge-outline text-sm badge-success'>
                            {payment.paymentMethod}
                            </span></td>
                    <td className='font-bold text-gray-700'>{payment.amount} $</td>
                    <td className='text-gray-800'>{new Date(payment.paid_at).toLocaleString()}</td>
                </tr>)
              }
           </tbody>
          </table>
        </div>
    );
};

export default PaymentHistory;