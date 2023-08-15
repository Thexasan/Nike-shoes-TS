import { lazy } from "react";

export const Layout = lazy(() => import("../Layout/Layout.tsx"));
export const Home = lazy(() => import("../pages/Home.tsx"));
export const Payment = lazy(()=> import ('../pages/Payment.tsx'))
