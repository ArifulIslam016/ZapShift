import { createBrowserRouter, data } from "react-router";
import MainLayout from "../Layouts/MainLayout/MainLayout";
import Home from "../Pages/Home/Home/Home";
import Coverage from "../Pages/Coverage/Coverage";

export const router=createBrowserRouter([
    {
        path:'/',
       Component: MainLayout,
       children:[
        { index: true,
            Component: Home
        },{
            path:"/coverage",
            Component: Coverage,
            loader:()=>fetch('./data/coverage.json')
        }
       ]
    }
])