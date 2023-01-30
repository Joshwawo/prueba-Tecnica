import {
  ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import { clientAxios } from "../helpers/clienteAxios";

interface AuthContexTypes {
  loading: boolean;
  auth: any;
  setAuth: React.Dispatch<React.SetStateAction<object>>;
}

const AuthContext = createContext<AuthContexTypes | null>(null);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const authUser = async () => {
      const getToken = localStorage.getItem("token");
      if (!getToken) {
        setLoading(false);
        return;
      }
      try {
        const { data } = await clientAxios.get("/studen/perfil", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken}`,
          },
        });
        setAuth(data);
      } catch (error) {
        console.log(error);
        setAuth({});
      } finally {
        setLoading(false);
      }
    };
    authUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe estar dentro de AuthProvider");
  return context;
};

export default useAuth;
