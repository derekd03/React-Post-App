import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import { FooterSimple } from "./FooterSimple";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <FooterSimple />
    </div>
  );
};

export default Layout;
