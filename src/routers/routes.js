import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../components/RootLayout";
import ErrorBoundary from "../components/ErrorBoundary";
import NotFound from "../components/NotFound";
import UserProtected from "./UserProtected";

const Home = lazy(() => import("../modules/Home"));
const DanhSachPhong = lazy(() => import("../modules/DanhSachPhong"));
const ChiTietPhong = lazy(() => import("../modules/ChiTietPhong"));
const Auth = lazy(() => import("../modules/Auth"));
const Signin = lazy(() => import("../modules/Auth/Signin"));
const Signup = lazy(() => import("../modules/Auth/Signup"));
const ThongTinCaNhan = lazy(() => import("../modules/ThongTinCaNhan"));

const routes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      //Home
      { index: true, element: <Home /> },

      //Danh sách phòng
      { path: "/danhsachphong/:maViTri", element: <DanhSachPhong /> },

      //Chi tiết phòng
      { path: "/chitietphong/:id", element: <ChiTietPhong /> },

      //Authentication
      {
        path: "",
        element: <Auth />,
        children: [
          { path: "/signin", element: <Signin /> },
          { path: "/signup", element: <Signup /> },
        ],
      },

      //Thông tin cá nhân
      {
        path: "/thongtincanhan",
        element: (
          <UserProtected>
            <ThongTinCaNhan />
          </UserProtected>
        ),
      },
    ],
  },

  { path: "*", element: <NotFound /> },
]);

export default routes;
