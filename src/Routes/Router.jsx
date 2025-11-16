import { createBrowserRouter} from "react-router";
import MainLayout from "../Layouts/MainLayout/MainLayout";
import Home from "../Pages/Home/Home/Home";
import Coverage from "../Pages/Coverage/Coverage";
import AuthenticationLayout from "../Layouts/AuthenticaionLayout/AuthenticationLayout";
import Login from "../Pages/AuthenticationsPages/Login/Login";
import Register from "../Pages/AuthenticationsPages/Register/Register";

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
    },{
        path:'/',
        Component: AuthenticationLayout,
        children:[
            {
                path:'login',
                Component: Login
            },{
                path:'register',
                Component: Register
            }
        ]
    }
])