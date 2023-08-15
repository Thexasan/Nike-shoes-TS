import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import AuthCheck from "./utils/AuthCheck";
import ProtectRoute from "./utils/ProtectedRoute";
import Layout from "./Layout/Layout";
import Sing from "./pages/Sing";
import Home from "./pages/Home";
import { Suspense } from "react";
import { Payment } from "./Routes/Routes";

const router = createBrowserRouter([
  // {
  //   path: "/",
  //   element: (
  //     // <AuthCheck>
  //       <Login />
  //     // {/* </AuthCheck> */}
  //   ),
  // },
  {
    path: "/",
    element: (
      <AuthCheck>
        <Sing/>
     </AuthCheck>
    ),
  },
  {
    path: "/main",
    element: (
      <ProtectRoute>
       <Layout/>
       </ProtectRoute>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path:"pay",
        element:(
          <Suspense fallback={<div>Loading...</div>}>
            <Payment/>
          </Suspense>
        )
      }
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
