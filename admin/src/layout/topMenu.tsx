import { BsGlobe } from "react-icons/bs";
import { MdOutlineNotifications } from "react-icons/md";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { useLogoutMutation } from "../redux/services/authentication";
import { deleteToken, getToken, setToken } from "../utils/tokenHandler";
import { useDispatch } from "react-redux";
import { setLogout } from "../redux/feature/authSlice";
import { persistor } from "../redux/store/store";
import { handleError, handleResponse } from "../utils/responseHandler";
import { useAppSelector } from "../redux/store/hooks";
import { useLocation, useNavigate } from "react-router-dom";
import { IMAGE_BASE_URL } from "@/constants";
import { clearProfile } from "@/redux/feature/profileSlice";
import useTranslation from "@/locale/useTranslation";
import user_image from "@/assets/user_image.jpeg";
import SearchBox from "@/components/SearchBox";
import EnglishFlag from "@/assets/english.png";
import JapanFlag from "@/assets/japan.png";
import Notification from "@/components/notification";
import { useState } from "react";
import { ListCollapse, Menu } from "lucide-react";
export default function TopMenu({ toggleView, handleToggle }) {
  const location = useLocation();
  const currentPath = location.pathname.split("/");
  const translate = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userId = useAppSelector((state) => state.auth.id);

  const notifications = useAppSelector((state) => state.socket.message);

  const [logout] = useLogoutMutation();

  const profileImage = useAppSelector((state) => state.profile.imageUrl);

  const [open, setOpen] = useState(false);

  const handleLanguageChange = (lang: string) => {
    setToken("lang", lang);
    window.location.reload();
  };

  const handleLogout = async () => {
    try {
      const response = await logout({ id: userId }).unwrap();
      handleResponse({ res: response, onSuccess: () => {} });
    } catch (error) {
      handleError({ error });
    }
    deleteToken("token");
    dispatch(clearProfile());

    dispatch(setLogout());
    persistor.purge();
  };

  return (
    <div className="w-full">
      <div className="bg-white h-full w-full border-b pt-[10px] pb-[0.5rem] px-[0.5rem]">
        <div className="flex justify-between py-[0.5rem]">
          <div className="flex items-center h-full gap-8 w-full mx-[2rem]">
            <button
              className={`transition-all duration-300 ${toggleView ? "rotate-180" : ""}`}
              onClick={handleToggle}
            >
              <ListCollapse />
            </button>
            <SearchBox />
          </div>
          <div className="flex items-center gap-[1rem] pr-[1.5rem]">
            {/* <DropdownMenu>
              <DropdownMenuTrigger>
                <BsGlobe size={22} className="text-[#444050] cursor-pointer" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <button
                    className={`flex gap-[8px] ${
                      getToken("lang") === "jp" ? "text-[#0190dd]" : ""
                    }`}
                    onClick={() => handleLanguageChange("jp")}
                  >
                    <img
                      src={JapanFlag}
                      alt="Japan Flag"
                      className="w-[16px] h-[16px]"
                    />
                    Japanese
                  </button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <button
                    className={`flex gap-[0.5rem]  ${
                      getToken("lang") === "en" ? "text-[#0190dd]" : ""
                    }`}
                    onClick={() => handleLanguageChange("en")}
                  >
                    <img
                      src={EnglishFlag}
                      alt="English Flag"
                      className="w-[16px] h-[16px]"
                    />
                    English
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu> */}
            <DropdownMenu open={open} onOpenChange={setOpen}>
              <DropdownMenuTrigger>
                <div className="relative">
                  <MdOutlineNotifications
                    size={32}
                    className="text-[#444050] cursor-pointer"
                  />
                  {notifications.length > 0 && (
                    <p className=" absolute top-[0rem] right-[0] bg-red-700 w-[1.5rem] h-[1.5rem] rounded-full ">
                      <span className="text-white">{notifications.length}</span>
                    </p>
                  )}
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <Notification setOpen={setOpen} />
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger className="pr-0">
                <img
                  src={
                    profileImage
                      ? `${IMAGE_BASE_URL}${profileImage}`
                      : user_image
                  }
                  alt="Profile"
                  className="h-[40px] w-[40px] min-w-fit rounded-full cursor-pointer border border-black object-contain"
                  crossOrigin="anonymous"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <button
                    onClick={() => navigate("/admin/profile")}
                    className={`${
                      currentPath.includes("profile") ? "text-[#0190dd]" : ""
                    }`}
                  >
                    {translate("My Profile")}
                  </button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <button onClick={handleLogout}>{translate("Log Out")}</button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
}
