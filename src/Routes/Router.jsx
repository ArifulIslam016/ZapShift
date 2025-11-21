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
      },
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
    children:[
        {
            path:'my-percels',
            Component:MyParcels,
        },{
          path:'payment/:id',
          Component: Payment
        
        },{
          path:'payment-cancel',
          Component: Cancel
        },{
          path:"payment-success",
          Component:Success
        }
    ]
  },
]);
