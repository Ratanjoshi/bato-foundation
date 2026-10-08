import { Outlet } from "react-router-dom";
import SideMenu from "./sideMenu";
import TopMenu from "./topMenu";
import TopMenuMobile from "./topMenuMobile";
import { useState } from "react";

export default function Layout() {
  // notification system disabled
  // const { connect } = useWebSocket();
  // useEffect(() => {
  //   connect();
  // }, []);

  // true for opening the side bar and false for collapsing the side bar
  const [toggleView, setToggleView] = useState<boolean>(true);

  const handleToggle = () => {
    setToggleView(!toggleView);
  };

  return (
    <>
      {/* For Desktop View */}
      <div className="hidden lg:flex bg-[#f3f7fa]">
        {/* Side Menu */}
        <div
          className={`h-screen fixed border-r shadow-gray-400 transition-all duration-300 ${toggleView ? "w-[18%]" : "max-2xl:w-[5%] w-[3.5%]"}`}
        >
          <SideMenu toggleView={toggleView} />
        </div>
        <div
          className={`flex flex-col h-screen w-screen transition-all duration-300 ${toggleView ? "ml-[18%]" : "max-2xl:ml-[5%] ml-[3.5%]"}`}
        >
          {/* Main Content */}
          <div>
            <TopMenu toggleView={toggleView} handleToggle={handleToggle} />
          </div>
          {/* Page content */}
          <div className="flex-1 px-[1.5rem] py-[1rem] overflow-auto">
            <Outlet />
          </div>
        </div>
      </div>
      {/* for Mobile View */}
      <div className="block lg:hidden ">
        <TopMenuMobile />

        {/* Page content */}
        <div className="flex-1 p-4 overflow-auto min-h-[87vh]">
          <Outlet />
        </div>
      </div>
    </>
  );
}
