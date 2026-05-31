
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import useAxiosSecure from '../../../Hook/useAxiosSecure';
import { AuthContext } from '../../../src/Context/AuthContext';
import Swal from 'sweetalert2';

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState('');
    const axiosSecure = useAxiosSecure();
    const { parcelId } = useParams();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    console.log(parcelId)

    // const { isPending, data: parcelInfo = [] } = useQuery({
    //     queryKey: ['parcel', parcelId],
    //     queryFn: async () => {
    //         const res = await axiosSecure.get(`/parcels/${parcelId}`);
    //         return res.data;
    //     }
    // });

    const {data:parcelInfo = [],isPending} = useQuery({
        queryKey:['parcel',parcelId],
        queryFn:async ()=>{
            const res = await axiosSecure.get(`/parcels/${parcelId}`);
            return res.data;
        }
    })

    if (isPending) {
        return '...loading';
    };

    console.log(parcelInfo);
    const amount = parcelInfo.cost;
    const amountInCents = amount * 100;
    // console.log(amountInCents);

    const handleSubmit = async (e) => {
        e.preventDefault();
            
        if(!stripe || !elements){
            return;
        }

      const card = elements.getElement(CardElement);

        if(!card){
            return;
        }

    const {error,paymentMethod} = await stripe.createPaymentMethod({
        type:'card',
        card
    });


        if (error) {
            setError(error.message);
            // console.log(error);
        }
        else {
            setError('');
            console.log(paymentMethod);

            const intent = await axiosSecure.post('/create-payment-intent', {
                amountInCents,
                parcelId
            });

            console.log('paymentIntent: ', intent);

            const clientSecret = intent.data.clientSecret;

            const confirmPayRes = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: user.displayName,
                        email: user.email
                    }
                }
            });

            if (confirmPayRes.error) {
                setError(confirmPayRes.error.message);
            }
            else {
                if (confirmPayRes.paymentIntent.status === 'succeeded') {
                    setError('');
                    console.log('Payment succeeded');
                    console.log(confirmPayRes);

                    const paymentData = {
                        parcelId,
                        amount,
                        email: user.email,
                        paymentMethod: confirmPayRes.paymentIntent.payment_method_types,
                        transactionId : confirmPayRes.paymentIntent.id
                    };

                    const paymentRes = await axiosSecure.post('/payments',paymentData);
                   
                    if(paymentRes.data.insertedId){
                        console.log('payment successfully logged');
                               Swal.fire({
                icon: 'success',
                title: 'Payment Successful!',
                html: `
                    <p>Your payment has been completed.</p>
                    <p><strong>Transaction ID:</strong> ${confirmPayRes.paymentIntent.id}</p>
                `,
                confirmButtonText: 'Go to My Parcels'
            }).then(() => {
                navigate('/dashboard/myParcels');
            });
                    }
                }

            }
        };

    }
    return (
        <form onSubmit={handleSubmit}
            className='space-y-4 p-6 bg-white shadow-xl rounded-2xl max-w-md w-full mx-auto'
        >
            <CardElement className='p-2 rounded border-2 border-gray-300'></CardElement>
            <button className='btn btn-primary text-white w-full' disabled={!stripe}>
                Pay {amount} $
            </button>
            {
                error && <p className='text-error'>{error}</p>
            }
        </form>
    );
};

export default PaymentForm;