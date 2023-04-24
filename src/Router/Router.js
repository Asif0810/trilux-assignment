import { createBrowserRouter } from "react-router-dom";
import Main from "../Main/Main";
import Registration from "../Page/Login/Registration";
import Navbar from "../Page/Navbar/Navbar";
import Login from "../Page/Login/Login";
import Home from "../Page/Home/Home";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/register",
        element: <Registration></Registration>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/",
        element: <Home></Home>,
      },
    ],
  },
]);
