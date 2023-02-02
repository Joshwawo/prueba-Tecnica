import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../context/AuthProvider";
import Navbar from "../components/Navbar";
import Spinner from "../components/Spinner";
const RouteAuth = () => {
  const { auth, loading } = useAuth();
  //  console.log(auth)
  if (loading) {
    return (
      <div className="">
        <div className="flex justify-center items-center h-screen">
          <Spinner/>
        </div>
      </div>
    );
  }

  return (
    <>
      {auth?._id ? (
        
        <>
        <Navbar/>
          <Outlet />
        </>
      ) : (
        <Navigate to="/" />
        // <Outlet />
      )}
    </>
  );
};

export default RouteAuth;
