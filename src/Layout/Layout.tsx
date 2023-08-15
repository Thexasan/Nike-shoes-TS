// import React from "react";
// import { destroyToken } from "../utils/token";
import { Outlet } from "react-router-dom";
import { Cart, Footer, Navbar } from "../components";
import { footerAPI } from "../data/data";

const Layout = () => {
  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (isValidToken()) {
  //     destroyToken();
  //   }
  // }, [navigate]);
  return (
    <>
      <div>
        <Navbar />
        <Cart />
      </div>
      <Outlet />
      <footer>
        <Footer footerAPI={footerAPI} />
      </footer>
    </>
  );
};

export default Layout;
