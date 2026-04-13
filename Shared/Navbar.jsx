import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router';
import ProFastLogo from '../ProFast/ProFastLogo';
import { AuthContext } from '../src/Context/AuthContext';

const Navbar = () => {
    const {logOut,user} = useContext(AuthContext);

    const navitems = <>
            <li><NavLink to="/">Home</NavLink></li>
             <li><NavLink to="/sendParcel">Send Parcel</NavLink></li>
            <li><NavLink to='/coverage1'>Coverage</NavLink></li>
            {
              user && <li><NavLink to='/dashboard'>Dashboard</NavLink></li>
            }
      <li><NavLink to='/beARider'>Be a rider</NavLink></li>

    </>;

    const handleLogout = () =>{
      logOut()
      .then(()=>{
        console.log('logout successfully');
      })
      .catch(error=>{
        console.log(error);
      })
    };


    return (
<div className="navbar mb-6 bg-base-100 rounded-lg shadow-sm">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
          {navitems}
      </ul>
    </div>
    <span className="btn btn-ghost text-xl"><ProFastLogo></ProFastLogo></span>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
   {navitems}
    </ul>
  </div>



<div className='navbar-end flex gap-4'>

  {/* user info */}
<div className="dropdown dropdown-end">
  <div tabIndex={0} role="button" className="flex items-center gap-2 cursor-pointer">
    
    {/* Avatar */}
    <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden">
      <img
        src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
        alt="user"
        className="w-full h-full object-cover"
      />
    </div>

  </div>

  {/* Dropdown menu */}
  <div
    tabIndex={0}
    className="menu menu-sm dropdown-content bg-base-100 rounded-box text-lg text-center mt-3 px-6 py-4 shadow"
  >
      {/* Name */}
    <p className="text-primary font-semibold hidden md:block">
      {user?.displayName || "User"}
    </p>

  </div>
</div>




  {/* logout button */}
  <div onClick={handleLogout}>
    
    <Link to='/login' className="btn btn-primary text-gray-700 font-semibold">{user ? <p>Logout</p> : <p>Login</p>}</Link>
  </div>
  </div>
</div>
    );
};

export default Navbar;