import { Outlet, Navigate } from "react-router-dom";

import { useAppSelector } from "../hook";
import Sidebar from "../components/Sidebar";
import { useEffect } from "react";

function Layout() {
  const user = useAppSelector((state) => state.user.user);

  useEffect(() => {
    window.addEventListener(
      "resize",
      function () {
        handleSetHeightOulet();
      },
      true
    );
    handleSetHeightOulet();
  }, []);

  const handleSetHeightOulet = () => {
    const outlet = document.querySelector(".outlet") as HTMLElement;
    if (window.innerWidth < 768) {
      outlet && (outlet.style.height = "calc(100vh - 3rem)");
    } else {
      outlet && (outlet.style.height = "100vh");
    }
  };

  if (!user) {
    return <Navigate to={"/login"}></Navigate>;
  }

  return (
    <div className="container p-0">
      <div className="row">
        <div className="col-lg-2 col-md-3 p-0" style={{ position: "relative" }}>
          <Sidebar />
        </div>
        <div className="outlet col-lg-10 col-md-9 p-0 mt-5 mt-sm-5 mt-md-0 position-relative">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
