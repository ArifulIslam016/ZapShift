import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout/MainLayout";
import Home from "../Pages/Home/Home/Home";
import Coverage from "../Pages/Coverage/Coverage";
import AuthenticationLayout from "../Layouts/AuthenticaionLayout/AuthenticationLayout";
import Login from "../Pages/AuthenticationsPages/Login/Login";
import Register from "../Pages/AuthenticationsPages/Register/Register";
import PrivateProvider from "./PrivateProvider";
import BeARider from "../Pages/BeARider/BeARider";
import SendParcel from "../Pages/SendParcel/SendParcel";
import DashboardLayot from "../Layouts/DashboardLayout/DashboardLayot";
import MyParcels from "../Pages/DashboardPages/MyParcels";
import Payment from "../Pages/DashboardPages/payments/Payment";
import Cancel from "../Pages/DashboardPages/payments/Cancel";
import Success from "../Pages/DashboardPages/payments/Success";
import MyPayment from "../Pages/DashboardPages/MyPaymnet/MyPayment";
import Riders from "../Pages/DashboardPages/Riders/Riders";
import UserManagemnet from "../Pages/DashboardPages/UserManagement/UserManagemnet";
import AdminRoute from "./AdminRoute";
import AssaginRider from "../Pages/DashboardPages/AssaginRider/AssaginRider";
import AssaignedDelivery from "../Pages/DashboardPages/AssaigendDelivery/AssaignedDelivery";
import RiderOnlyRoute from "./RiderOnlyRoute";
import RiderCompletedDeliveries from "../Pages/DashboardPages/RiderCompletedDelivereis/RiderCompletedDeliveries";
import ParcelTracking from "../Pages/Tracking/ParcelTracking";
import DashboardHomePage from "../Pages/DashboardPages/DashboardHomePages/DashboardHomePage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      { index: true, Component: Home },
      {
        path: "/coverage",
        Component: Coverage,
        loader: () => fetch("./data/coverage.json"),
      },
      {
        path: "/send-parcel",
        element: (
          <PrivateProvider>
            <SendParcel></SendParcel>
          </PrivateProvider>
        ),
        loader: () => fetch("./data/coverage.json"),
      },
      {
        path: "/rider",
        element: (
          <PrivateProvider>
            <BeARider></BeARider>
          </PrivateProvider>
        ),
        loader: () => fetch("./data/coverage.json"),
      },{
        path:'parcel/:trackingId',
        Component:ParcelTracking
      }
    ],
  },
  {
    path: "/",
    Component: AuthenticationLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateProvider>
        <DashboardLayot></DashboardLayot>
      </PrivateProvider>
    ),
    children: [
      {
        index:true,
        Component:DashboardHomePage
      },
      {
        path: "my-percels",
        Component: MyParcels,
      },
      {
        path: "my-payments",
        Component: MyPayment,
      },
      {
        path: "payment/:id",
        Component: Payment,
      },
      {
        path: "payment-cancel",
        Component: Cancel,
      },
      {
        path: "payment-success",
        Component: Success,
      },
      // rider Only routes
      {
        path: "assaigned-delivery",
        element: (
          <RiderOnlyRoute>
            <AssaignedDelivery></AssaignedDelivery>
          </RiderOnlyRoute>
        ),
      },
      {
        path: "completed-delivery",
        element: (
          <RiderOnlyRoute>
            <RiderCompletedDeliveries></RiderCompletedDeliveries>
          </RiderOnlyRoute>
        ),
      },
      // Admin only routes
      {
        path: "approve-rider",

        element: (
          <AdminRoute>
            <Riders></Riders>
          </AdminRoute>
        ),
      },
      {
        path: "user-manage",
        element: (
          <AdminRoute>
            <UserManagemnet></UserManagemnet>
          </AdminRoute>
        ),
      },
      {
        path: "assagin-rider",
        element: (
          <AdminRoute>
            <AssaginRider></AssaginRider>
          </AdminRoute>
        ),
      },
    ],
  },
]);
