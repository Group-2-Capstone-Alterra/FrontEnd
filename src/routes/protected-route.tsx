import React from "react";
import { useCookies } from "react-cookie";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }: { children?: React.ReactNode }) => {
  const [cookies] = useCookies<any>(["token", "role"]);
  const { pathname } = useLocation();

  const authProtected = ["/login", "/register"];
  const protectedByToken = ["/edit-profile", "/admin", "/admin/edit-profile", "/admin/products/:product_id", "/admin/products/add-edit/:product_id", "/chat", "/admin/service-requests", "/admin/sales", "/history", "payment"];
  const userProtected = ["/edit-profile", "/chat", "/history", "/payment"];
  const adminProtected = ["/admin", "/admin/edit-profile", "/admin/products/:product_id", "/admin/products/add-edit/:product_id", "/admin/service-requests", "/admin/sales"];

  if (authProtected.includes(pathname)) {
    if (cookies.token) return <Navigate to={"/"} />;
  }
  if (protectedByToken.includes(pathname)) {
    if (!cookies.token) {
      return <Navigate to={"/login"} />;
    }

    if (userProtected.includes(pathname)) {
      if (cookies.role == "admin") {
        return <Navigate to={"/"} />;
      }
    }

    if (adminProtected.includes(pathname)) {
      if (cookies.role == "user") {
        return <Navigate to={"/admin"} />;
      }
    }
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
