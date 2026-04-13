import React from 'react';
import { NavLink, Outlet } from 'react-router';
import ProFastLogo from '../../../ProFast/ProFastLogo';
import { HiHome, HiClipboardList, HiCreditCard, HiTruck, HiUser, HiUserAdd, HiUserGroup, HiClock, HiCheckCircle, HiCurrencyDollar } from "react-icons/hi";
import useUserRole from '../../../Hook/useUserRole';
import { FaMotorcycle, FaUserClock } from 'react-icons/fa';



const DashBoardLayout = () => {
  const { role, isLoading, authLoading } = useUserRole();
  console.log(role);

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="navbar bg-base-300 w-full lg:hidden">
          <div className="flex-none lg:hidden">
            <label htmlFor="my-drawer-2" aria-label="open sidebar" className="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="mx-2 flex-1 px-2">Navbar Title</div>
          <div className="hidden flex-none lg:block">
            <ul className="menu menu-horizontal">
              {/* Navbar menu content here */}
              <li><a>Navbar Item 1</a></li>
              <li><a>Navbar Item 2</a></li>
            </ul>
          </div>
        </div>
        {/* Page content here */}
        <Outlet></Outlet>
      </div>


      <div className="drawer-side">
        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu bg-base-200 min-h-full w-80 p-4 overflow-y-auto">
          {/* Sidebar content here */}
          <ProFastLogo></ProFastLogo>
          <li>
            <NavLink to="/" className="flex items-center gap-2">
              <HiHome size={18} />
              Home
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/myParcels" className="flex items-center gap-2">
              <HiClipboardList size={18} />
              My Parcels
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/paymentHistory" className="flex items-center gap-2">
              <HiCreditCard size={18} />
              Payment History
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/track" className="flex items-center gap-2">
              <HiTruck size={18} />
              Track a Parcel
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/profile" className="flex items-center gap-2">
              <HiUser size={18} />
              Profile
            </NavLink>
          </li>


          {/* rider link */}
          {
            !authLoading && role === 'rider' && <>
              <li>
                <NavLink to="/dashboard/pendingDeliveries" className="flex items-center gap-2">
                  <HiClock size={18} />
                  Pending Deliveries
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/completedDeliveries" className="flex items-center gap-2">
                  <HiCheckCircle size={18} />
                  Completed Deliveries
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/myEarnings" className="flex items-center gap-2">
                  <HiCurrencyDollar size={18} />
                  My Earnings
                </NavLink>
              </li>
            </>
          }


          {/* admin link*/}
          {
            !authLoading && role === 'admin' && <>

              {/* pending riders */}
              <li>
                <NavLink to="/dashboard/pendingRiders" className="flex items-center gap-2">
                  <FaUserClock size={18} />
                  Pending Riders
                </NavLink>
              </li>


              {/* active riders */}
              <li>
                <NavLink to="/dashboard/activeRiders" className="flex items-center gap-2">
                  <HiUserGroup size={18} />
                  Active Riders
                </NavLink>
              </li>

              {/* make admin */}
              <li>
                <NavLink to="/dashboard/makeAdmin" className="flex items-center gap-2">
                  <HiUserAdd size={18} />
                  Make Admin
                </NavLink>
              </li>


              {/* Assign rider */}
              <li>
                <NavLink to="/dashboard/assignRider" className="flex items-center gap-2">
                  <FaMotorcycle size={18} />
                  Assign Rider
                </NavLink>
              </li>
            </>
          }


        </ul>
      </div>
    </div>
  );
};

export default DashBoardLayout;