import React from 'react';
import { Outlet } from 'react-router';
import authImg from '../assets/authImage.png'
import ProFastLogo from '../../ProFast/ProFastLogo';

const AuthLayout = () => {
    return (
<div className="px-12 py-10 bg-base-200">
  <ProFastLogo></ProFastLogo>
  <div className="hero-content flex-col lg:flex-row-reverse mt-10">
    <div className='flex-1'>
    <img
      src={authImg}
      className="max-w-sm rounded-lg"
    />
    </div>

    <div className='flex-1'>
    <Outlet></Outlet>
    </div>
  </div>
</div>
    );
};

export default AuthLayout;