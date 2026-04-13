import React from 'react';
import logo from '../src/assets/logo.png'
import { Link } from 'react-router';

const ProFastLogo = () => {
    return (
        <Link to='/'>
            <div className='flex items-end'>
                <img className='mb-2' src={logo}></img>
                <p className='text-3xl font-extrabold -ml-3'>Profast</p>
            </div>
        </Link>

    );
};

export default ProFastLogo;