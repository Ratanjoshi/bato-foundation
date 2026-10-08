import {
  MdFilterList,
  MdKeyboardArrowRight,
  MdOutlineDashboard,
} from "react-icons/md";
import FullLogo from "../assets/brandLogo.png";
import SmallLogo from "../assets/smallLogo.webp";
import { SideListMenuType, SideMenuList } from "./sideMenuList";
import { SetStateAction, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { checkViewAccessList } from "@/utils/accessHelper";
import useTranslation from "@/locale/useTranslation";
import { LayoutDashboard } from "lucide-react";
import Tooltip, { SideBarTooltip } from "@/components/Tooltip";

export default function SideMenu({
  toggleView,
  setToggleState,
}: Readonly<{
  toggleView: boolean;
  setToggleState?: React.Dispatch<SetStateAction<boolean>>;
}>) {
  const location = useLocation();
  const currentPath = location.pathname.split("/");
  const translate = useTranslation();
  const navigate = useNavigate();
  const viewAccess = checkViewAccessList();
  const [isVisible, setIsVisible] = useState<number[]>([]);
  const [isActive, setIsActive] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile (matches the hamburger breakpoint)
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint to match hamburger menu
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Always show expanded view on mobile, respect toggleView on desktop
  const shouldShowExpanded = isMobile || toggleView;

  const handleClick = (key: number) => {
    setIsVisible((prev) => {
      if (prev.includes(key)) {
        return prev.filter((each) => each !== key);
      } else {
        return [...prev, key];
      }
    });
  };

  const handleNavigate = (name: string, path?: string) => {
    setIsActive(name);
    navigate(path ? path : "");
    if (setToggleState) {
      setToggleState(false);
    }
  };

  return (
    <div className="w-full h-full bg-white pt-[7px] px-[12px] overflow-y-auto">
      {/* logo section */}
      <div
        className={`flex items-center gap-4 ${shouldShowExpanded ? "px-4 py-2" : "p-0"}`}
      >
        {shouldShowExpanded ? (
          <img
            src={FullLogo}
            alt="Logo"
            className={`h-[3rem] object-contain`}
          />
        ) : (
          <img
            src={SmallLogo}
            alt="Logo"
            className={`h-[3rem] object-contain`}
          />
        )}

        {shouldShowExpanded && (
          <div className="grid max-sm:hidden flex-1 text-left text-lg leading-tight">
            <h2 className="truncate font-semibold">Admin Panel</h2>
            <h3 className="truncate text-muted-foreground">
              Management System
            </h3>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-[6px] mt-[6px]">
        {/* Dashboard */}
        <div
          className={`${
            currentPath.includes("dashboard")
              ? "bg-gradient-to-r from-primaryColor to-gradientColor text-white"
              : ""
          } hover:bg-gradient-to-r hover:from-primaryColor hover:to-gradientColor hover:text-white flex  items-center rounded-[0.25rem] py-[0.5rem] px-[0.75rem] cursor-pointer mt-[0.5rem] ${shouldShowExpanded ? "justify-between" : "justify-center"}`}
          onClick={() => handleNavigate("dashboard", "/admin/dashboard")}
        >
          {shouldShowExpanded ? (
            <div className="flex items-center gap-[0.5rem]">
              <div className="h-[26px] w-[26px] flex-1 flex items-center">
                <LayoutDashboard size={22} />
              </div>
              <p className="font-[400] text-[1rem]">{translate("Dashboard")}</p>
            </div>
          ) : (
            <Tooltip content="Dashboard">
              <div className="h-[26px] w-[26px] flex-1 flex items-center justify-center">
                <LayoutDashboard size={22} />
              </div>
            </Tooltip>
          )}
        </div>
        <div
          className={`${
            currentPath.includes("approve-request")
              ? "bg-gradient-to-r from-primaryColor to-gradientColor text-white"
              : ""
          } hover:bg-gradient-to-r hover:from-primaryColor hover:to-gradientColor hover:text-white flex  items-center rounded-[0.25rem] py-[0.5rem] px-[0.75rem] cursor-pointer mt-[0.5rem] ${shouldShowExpanded ? "justify-between" : "justify-center"}`}
          onClick={() => handleNavigate("request", "/admin/approve-request")}
        >
          {/* <div className="flex items-center gap-[0.5rem]">
            <div className="h-[22px] w-[22px] flex-1 flex items-center">
              <MdFilterList />
            </div>
            <p className="font-[400] text-[1rem]">Request</p>
          </div> */}
          {shouldShowExpanded ? (
            <div className="flex items-center gap-[0.5rem]">
              <div className="h-[26px] w-[26px] flex-1 flex items-center">
                <MdFilterList size={22} />
              </div>
              <p className="font-[400] text-[1rem]">{translate("Request")}</p>
            </div>
          ) : (
            <Tooltip content="Request">
              <div className="h-[26px] w-[26px] flex-1 flex items-center justify-center">
                <MdFilterList size={22} />
              </div>
            </Tooltip>
          )}
        </div>

        {/* Apps and Pages */}
        {shouldShowExpanded && (
          <p className="text-[#ACAAB1] font-[400] text-[13px] mt-[1rem] text-start">
            {translate("APPS & PAGES")}
          </p>
        )}

        {SideMenuList.map((each: SideListMenuType, index) => {
          const subMenuList = each.menu
            ? each.menu.map((each) => each.name)
            : [each.name];
          return (
            <div key={index}>
              {each.menu ? (
                subMenuList.some((item) => viewAccess.includes(item)) && (
                  <div
                    className={`text-[#2F2B3D] flex items-center rounded-[0.25rem] py-[0.5rem] px-[0.75rem] cursor-pointer ${shouldShowExpanded ? "bg-[#EEEEEF] justify-between" : "justify-center"}`}
                    onClick={() => {
                      if (shouldShowExpanded) {
                        if (each.path) {
                          handleNavigate(each.name, each.path);
                        } else {
                          handleClick(each.key);
                        }
                      }
                    }}
                  >
                    {/* Primary menu */}
                    {shouldShowExpanded ? (
                      <div className="flex items-center gap-[0.5rem]">
                        <div className="h-[26px] w-[26px] flex items-center">
                          <span className="text-[22px]">{each.icon}</span>
                        </div>
                        <p className="font-[400] text-[1rem] text-start">
                          {translate(each.name)}
                        </p>
                      </div>
                    ) : (
                      <SideBarTooltip
                        icon={
                          <div className="h-[26px] w-[26px] flex items-center justify-center">
                            <span className="text-[22px]">{each.icon}</span>
                          </div>
                        }
                      >
                        <div className="flex flex-col gap-4">
                          {each.menu.map((item) => (
                            <button
                              key={item.key}
                              className="flex gap-[0.5rem] items-center"
                              onClick={() => navigate(item.path)}
                            >
                              <div className="h-[26px] w-[26px] flex items-center">
                                <span className="text-[22px]">{item.icon}</span>
                              </div>
                              <p className="font-[400] text-[1rem] text-start">
                                {translate(item.name)}
                              </p>
                            </button>
                          ))}
                        </div>
                      </SideBarTooltip>
                    )}
                    {shouldShowExpanded && (
                      <div>
                        <MdKeyboardArrowRight
                          className={`${
                            isVisible.includes(each.key) ? "rotate-[90deg]" : ""
                          }`}
                        />
                      </div>
                    )}
                  </div>
                )
              ) : (
                <>
                  {viewAccess.includes(each.name) && (
                    <div
                      className={`text-[#2F2B3D] flex  ${shouldShowExpanded ? "bg-[#EEEEEF] justify-between" : "justify-center"}  items-center rounded-[0.25rem] py-[0.5rem] px-[0.75rem] hover:text-white hover:bg-gradient-to-r hover:from-primaryColor hover:to-gradientColor cursor-pointer ${
                        currentPath.includes(each.name.toLowerCase()) ||
                        currentPath.includes(
                          each.name.toLowerCase() + "-category",
                        )
                          ? "bg-gradient-to-r from-primaryColor to-gradientColor text-white"
                          : ""
                      }`}
                      onClick={() => {
                        if (each.path) {
                          handleNavigate(each.name, each.path);
                        } else {
                          handleClick(each.key);
                        }
                      }}
                    >
                      {/* Primary menu */}
                      {shouldShowExpanded ? (
                        <div className="flex items-center gap-[0.5rem]">
                          <div className="h-[26px] w-[26px] flex items-center">
                            <span className="text-[22px]">{each.icon}</span>
                          </div>
                          <p className="font-[400] text-[1rem] text-start">
                            {translate(each.name)}
                          </p>
                        </div>
                      ) : (
                        <Tooltip content={each.name}>
                          <div className="h-[26px] w-[26px] flex items-center justify-center">
                            <span className="text-[22px] flex justify-center">
                              {each.icon}
                            </span>
                          </div>
                        </Tooltip>
                      )}
                    </div>
                  )}
                </>
              )}

              {/* sub menu */}
              <>
                {each.menu &&
                  isVisible.includes(each.key) &&
                  each.menu.map((item, index) => (
                    <SideBarMenuContent
                      key={index}
                      handleNavigate={handleNavigate}
                      toggleView={shouldShowExpanded}
                      viewAccess={viewAccess}
                      isActive={isActive}
                      item={item}
                      currentPath={currentPath}
                      index={index}
                    />
                  ))}
              </>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SideBarMenuContent({
  handleNavigate,
  toggleView,
  viewAccess,
  isActive,
  item,
  currentPath,
  index,
}) {
  const translate = useTranslation();
  return (
    <div key={index} className="space-y-[0.25rem] mt-[0.25rem]">
      {viewAccess.includes(item.name) && (
        <div
          key={index}
          className={`flex items-center gap-[0.5rem] text-[#2F2B3D] hover:text-white px-[1.5rem] py-[0.5rem] rounded-[0.25rem] cursor-pointer hover:bg-gradient-to-r hover:from-primaryColor hover:to-gradientColor ${
            isActive === item.name ||
            currentPath.includes(item.name.toLowerCase())
              ? "bg-gradient-to-r from-primaryColor to-gradientColor text-white"
              : ""
          }`}
          onClick={() => handleNavigate(item.name, item.path)}
        >
          <div className="h-[26px] w-[26px] flex items-center">
            <span className="text-[22px]">{item.icon}</span>
          </div>
          {toggleView && (
            <p className="font-[400] text-[1rem] text-start">
              {translate(item.name)}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
