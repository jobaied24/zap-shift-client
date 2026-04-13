import React from 'react';
import merchant from '../../../src/assets/location-merchant.png'

const BeMerchant = () => {
    return (
<div data-aos="fade-right" className="bg-[url(assets/be-a-merchant-bg.png)] bg-[#03373D] bg-no-repeat p-16 rounded-2xl">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <img
      src={merchant}
      className="max-w-sm rounded-lg "
    />
    <div>
      <h1 className="text-4xl font-bold text-white">Merchant and Customer Satisfaction is Our First Priority</h1>
      <p className="py-6 text-gray-200">
       We offer the lowest delivery charge with the highest value along with 100% safety of your product. Pathao courier delivers your parcels in every corner of Bangladesh right on time.
      </p>
      <button className="btn btn-primary px-6 rounded-full">Become a Merchant</button>
      <button className="btn btn-primary btn-outline ms-4 px-6 rounded-full">Earn with ZapShift Courier</button>
    </div>
  </div>
</div>
    );
};

export default BeMerchant;
