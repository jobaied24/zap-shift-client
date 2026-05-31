import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../../Pages/Home/Home";
import AuthLayout from "../AuthLayout/AuthLayout";
import Login from "../AuthLayout/Login";
import Register from "../AuthLayout/Register/Register";
import Coverage1 from "../Coverage/Coverage1";
import { Component } from "react";
import SendParcel from "../../Pages/Home/SendParcel/SendParcel";
import DashBoardLayout from "../Layouts/DashBoardLayout/DashBoardLayout";
import PrivateRouts from "../Routs/PrivateRouts"
import MyParcels from "../../Pages/DashBoard/MyParcels/MyParcels";
import Payment from "../../Pages/DashBoard/Payment/Payment";
import PaymentHistory from "../../Pages/DashBoard/Payment/PaymentHistory/PaymentHistory";
import TrackParcel from "../../Pages/DashBoard/TrackParcel/TrackParcel";
import BeARider from "../../Pages/DashBoard/BeARider/BeARider";
import PendingRiders from "../../Pages/DashBoard/PendingRiders/PendingRiders";
import ActiveRiders from "../../Pages/DashBoard/ActiveRiders.jsx/ActiveRiders";
import MakeAdmin from "../../Pages/DashBoard/MakeAdmin/MakeAdmin";
import AdminSecureRouts from "../Routs/AdminSecureRouts";
import Forbidden from "../../Pages/Forbidden/Forbidden";
import AssignRider from "../../Pages/DashBoard/AssignRider/AssignRider";
import PendingDeliveries from "../../Pages/DashBoard/PendingDeliveries/PendingDeliveries";
import RiderSecureRouts from "../Routs/RiderSecureRouts";
import CompletedDeliveries from "../../Pages/DashBoard/CompletedDeliveries/CompletedDeliveries";
import MyEarnings from "../../Pages/DashBoard/MyEarnings/MyEarnings";
import DashBoardHome from "../../Pages/DashBoard/DashBoardHome/DashBoardHome";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: '/coverage1',
        Component: Coverage1,
        loader: () => fetch('/warehouses.json')
      },
      {
        path:'/beARider',
         element:<PrivateRouts>
          <BeARider></BeARider>
         </PrivateRouts>,
          loader: () => fetch('/warehouses.json')
      },
      {
       path:'/forbidden',
       Component:Forbidden
      },
      {
        path: '/sendParcel',
        element:<PrivateRouts>
          <SendParcel></SendParcel>
        </PrivateRouts>,
        loader: () => fetch('../../public/warehouses.json')
      }
    ]
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: '/login',
        Component: Login
      },
      {
        path: '/register',
        Component: Register
      }
    ]
  },
  {
    path: '/dashboard',
    element: <PrivateRouts>
      <DashBoardLayout></DashBoardLayout>
    </PrivateRouts>,
    children: [
      {
        index:true,
        Component:DashBoardHome
      },
      {
        path:'myParcels',
        Component:MyParcels
      },
      {
        path:'payments/:parcelId',
        Component:Payment
      },
      {
        path:'paymentHistory',
        Component:PaymentHistory
      },
      {
        path:'track',
        Component:TrackParcel
      },
       {
      path: "track/:trackingId",
      element: <TrackParcel />
    },

     {
        path:'pendingRiders',
        element:<AdminSecureRouts>
          <PendingRiders
          ></PendingRiders>
        </AdminSecureRouts>
      },
      {path:'activeRiders',
        element:<AdminSecureRouts>
          <ActiveRiders></ActiveRiders>
        </AdminSecureRouts>
      },
    {
      path:'makeAdmin',
      element:<AdminSecureRouts>
        <MakeAdmin></MakeAdmin>
        </AdminSecureRouts>
    },
    {
      path:'assignRider',
      element:<AdminSecureRouts>
        <AssignRider></AssignRider>
      </AdminSecureRouts>
    },
    {
      path:'pendingDeliveries',
      element:<RiderSecureRouts>
        <PendingDeliveries></PendingDeliveries>
        </RiderSecureRouts>
    },
    {
      path:'completedDeliveries',
      element:<RiderSecureRouts>
        <CompletedDeliveries></CompletedDeliveries>
      </RiderSecureRouts>
    },
    {
      path:'myEarnings',
      element:<RiderSecureRouts>
        <MyEarnings></MyEarnings>
      </RiderSecureRouts>
    }
    ]
  }
]);