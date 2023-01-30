import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../context/AuthProvider";
const RouteAuth = () => {
  const { auth, loading } = useAuth();
  //  console.log(auth)
  if (loading) {
    return (
      <div className="">
        <div className="flex justify-center items-center h-screen">
          <p className="text-red-600 text-4xl">Cargando....</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {auth?._id ? (
        <Outlet />
      ) : (
        <Navigate to="/" />
        // <Outlet />
      )}
    </>
  );
};

export default RouteAuth;
