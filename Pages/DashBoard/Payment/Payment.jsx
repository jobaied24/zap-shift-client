// import { Elements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';
// import React from 'react';
// import PaymentForm from './PaymentForm';

// const Payment = () => {
//     const stripePromise = loadStripe(import.meta.env.VITE_stripe_public_key);
//     return (
//    <Elements stripe={stripePromise}>
//     <PaymentForm></PaymentForm>
//    </Elements>
//     );
// };

// export default Payment;

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';
import React from 'react';

const Payment = () => {
    const stripePromise = loadStripe(import.meta.env.VITE_stripe_public_key);

    return (
<Elements stripe={stripePromise}>
    <PaymentForm></PaymentForm>
</Elements>
    )
};

export default Payment;