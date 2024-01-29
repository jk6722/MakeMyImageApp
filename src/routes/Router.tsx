import { Outlet, createBrowserRouter } from "react-router-dom";
import Home from "../pages/home/Home";
import Login from "../pages/auth/login/Login";
import SignUp from "../pages/auth/signup/SignUp";
import Layout from "../pages/layout/Layout";
import Header from "../pages/layout/Header";
import Gallery from "../pages/gallery/Gallery";

export const route = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Header />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: "images",
            element: <Gallery />,
          },
        ],
      },
      {
        path: "auth",
        element: <Outlet />,
        children: [
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "signup",
            element: <SignUp />,
          },
        ],
      },
    ],
  },
]);
