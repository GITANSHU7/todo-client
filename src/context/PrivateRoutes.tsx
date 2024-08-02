import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";
import NavigationBar from "../components/NavigationBar";

const PrivateRoutes = () => {
  const { authenticated } = useAuth();
  return authenticated ? (
    <>
      <NavigationBar />
      <div className="min-h-screen">
        <Outlet />
      </div>
      {/* <AppFooter /> */}
    </>
  ) : (
    <Navigate to="/signin" />
  );
};

export default PrivateRoutes;
