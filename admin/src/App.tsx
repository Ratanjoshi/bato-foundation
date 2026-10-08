import { SubmitHandler, useForm } from "react-hook-form";
import "./App.css";
import Input from "./components/Input";
import Button from "./components/Button";
import { RiLoginBoxLine } from "react-icons/ri";
import { useLoginMutation } from "./redux/services/authentication";
import { handleError, handleResponse } from "./utils/responseHandler";
import { useNavigate } from "react-router-dom";
import { deleteToken, getToken, setToken } from "./utils/tokenHandler";
import { useEffect, useState } from "react";
import Toast from "./components/Toast";
import { useDispatch } from "react-redux";
import { setAuthData } from "./redux/feature/authSlice";
import Logo from "./assets/brandLogo.png";
import { jwtDecode } from "jwt-decode";
import { clearProfile } from "./redux/feature/profileSlice";
import { trimFormData } from "./utils/validationHelper";
import { PROJECT_NAME } from "./constants/projectConstants";
import { Lock, Mail, User } from "lucide-react";
import { Card, CardContent, CardHeader } from "./components/ui/card";

interface FormValues {
  username: string;
  password: string;
}

interface DecodedToken {
  exp: number;
  iat?: number;
  [key: string]: any;
}

export default function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login] = useLoginMutation();

  useEffect(() => {
    const token = getToken("token");
    setToken("lang", "en");
    if (token) {
      try {
        const decodedToken: DecodedToken = jwtDecode(token);

        if (decodedToken?.exp * 1000 > Date.now()) {
          navigate("/admin/dashboard");
          Toast("User Logged in Successful", "success");
        } else {
          Toast("Session Expired. Please Try Again", "error");
          dispatch(clearProfile());
          deleteToken("token");
          navigate("/admin");
        }
      } catch (error) {
        Toast("Invalid Token. Please Try Again", "error");
        navigate("/admin");
      }
    } else {
      navigate("/");
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const trimmedData = trimFormData(data);
      const response = await login(trimmedData).unwrap();
      setToken("token", response.data.token);
      dispatch(setAuthData(response.data));
      handleResponse({
        res: response,
        onSuccess: () => navigate("/admin/dashboard"),
      });
    } catch (error) {
      handleError({ error });
    }
  };

  return (
    <main className="w-full min-h-screen flex flex-col lg:flex-row">
      {/* Carousel Section */}
      <div className="bg-[#0e2753] w-full lg:w-1/2 min-h-[40vh] lg:min-h-screen flex justify-center items-center order-2 lg:order-1">
        <AuthCarousel />
      </div>

      {/* Login Form Section */}
      <div className="w-full lg:w-1/2 min-h-[60vh] lg:min-h-screen flex justify-center items-center p-4 lg:p-8 order-1 lg:order-2">
        <div className="flex-1 flex items-center justify-center">
          <Card className="w-full max-w-[30rem]">
            <CardHeader className="text-center"></CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="auth-form-wrapper">
                  <div className="flex justify-center mb-6">
                    <img
                      src={Logo}
                      alt="Logo"
                      className="h-[4rem] sm:h-[5rem] lg:h-[6rem] w-full object-contain"
                    />
                  </div>
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center mb-6">
                    {PROJECT_NAME} Login
                  </h1>
                  <div className="space-y-4">
                    <Input
                      label="Username"
                      placeholder="Enter your Username"
                      {...register("username", {
                        required: "Username is Required",
                      })}
                      error={errors.username}
                    />
                    <Input
                      label="Password"
                      placeholder="Password"
                      type="password"
                      {...register("password", {
                        required: "Password is Required",
                      })}
                      error={errors.password}
                    />
                    <Button type="submit" className="submit-button w-full">
                      <div className="flex justify-center items-center gap-[0.5rem] text-white">
                        Login <RiLoginBoxLine />
                      </div>
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}

const AuthCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      icon: <User className="h-12 w-12 sm:h-16 sm:w-16 mb-4 sm:mb-6" />,
      title: "Welcome to Nirvana Core",
      subtitle: "Admin Portal by Tech Nirvana",
      description: "Manage, Control, and Optimize Your Website with Ease",
      features: [
        "Centralized Access",
        "Role-Based Control",
        "Modern Interface",
      ],
    },
    {
      icon: <Lock className="h-12 w-12 sm:h-16 sm:w-16 mb-4 sm:mb-6" />,
      title: "Enterprise-Grade Security",
      subtitle: "Your Data, Fully Protected",
      description:
        "Built with industry best practices to safeguard sensitive guest and business information.",
      features: ["Data Encryption", "Audit Trails", "Secure Authentication"],
    },
    {
      icon: <Mail className="h-12 w-12 sm:h-16 sm:w-16 mb-4 sm:mb-6" />,
      title: "Smart Notifications",
      subtitle: "Stay Ahead in Real-Time",
      description:
        "Receive instant updates on reservations, guest requests, and operational alerts — anytime, anywhere.",
      features: ["Instant Alerts", "Reservation Updates", "Staff Coordination"],
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="text-white relative z-10 max-w-sm sm:max-w-md lg:max-w-lg max-lg:py-10 w-full px-4 lg:px-0">
      <div className="mb-4 sm:mb-8">
        <div className="bg-white/20 p-3 sm:p-4 rounded-2xl backdrop-blur-sm inline-block mb-3 sm:mb-4">
          {slides[currentSlide].icon}
        </div>
        <div className="flex items-center justify-center mb-3 sm:mb-4">
          <span className="text-2xl sm:text-3xl lg:text-4xl font-bold">
            Admin Portal
          </span>
        </div>
      </div>

      <div className="min-h-[200px] sm:min-h-[250px] lg:min-h-[300px] flex flex-col justify-center items-center">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 transition-all duration-500 text-center">
          {slides[currentSlide].title}
        </h1>
        <h2 className="text-base sm:text-lg lg:text-xl text-blue-100 mb-3 sm:mb-4 transition-all duration-500">
          {slides[currentSlide].subtitle}
        </h2>
        <p className="text-sm sm:text-base lg:text-lg text-blue-100 mb-4 sm:mb-6 lg:mb-8  transition-all duration-500  sm:px-0">
          {slides[currentSlide].description}
        </p>

        <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6 lg:mb-8">
          {slides[currentSlide].features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center text-blue-100 text-sm sm:text-base"
            >
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full mr-2 sm:mr-3"></div>
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Carousel indicators */}
      <div className="flex justify-center space-x-1.5 sm:space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-white" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
};
