import MainLayout from "./Layout/MainLayout";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./Page/Home/Home";
import SignIn from "./Page/SignIn/SignIn";
import SignUp from "./Page/SignUp/SignUp";
import AuthProvider from "./AuthProvider/AuthProvider";
import { Toaster } from "react-hot-toast";

function App() {

  const router = new createBrowserRouter([
    {
      path : "/",
      element : <MainLayout />,
      children : [
        {
          path : "/",
          element : <Home />
        },
        {
          path : "/signIn",
          element : <SignIn/>
        },
        {
          path : "/signUp",
          element : <SignUp />
        }
      ]
    }
  ])
  

  return (
    <>
    <AuthProvider>
    <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
    <Toaster />
    </>
    
  )
}

export default App
