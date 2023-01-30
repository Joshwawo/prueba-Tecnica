import {
  ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import useAuth from "./AuthProvider";
import { clientAxios } from "../helpers/clienteAxios";
import { AllStudents, StudentPerfil } from "../types/users";

interface SysContexTypes {
  students: AllStudents[] | undefined;
  getStudentById: (id: string) => void;
  student: StudentPerfil | undefined ;
  loadingSys: boolean;
}

const SysContext = createContext<SysContexTypes | null>(null);

const SysProvider = ({ children }: { children: ReactNode }) => {
  const [students, setStudents] = useState<AllStudents[]>([] as AllStudents[]);
  const [student, setStudent] = useState<StudentPerfil>({} as StudentPerfil );
  const [loadingSys, setLoadingsys] = useState<boolean>(false);


  const { auth } = useAuth();
  //?Obtener todos los estudiante
  const getStuden = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    try {
      const { data } = await clientAxios.get<AllStudents[]>("/studen", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setStudents(data);
    } catch (error) {
      console.log(error);
    }
  };
  const getStudentById = async (id: string) => {
    setLoadingsys(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }
      const { data } = await clientAxios.get<StudentPerfil>(`/studen/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setStudent(data);
    } catch (error) {
      console.log(error);
    }finally{
      setLoadingsys(false);
    }
  };

  useEffect(() => {
    getStuden();
  }, [auth]);

  return (
    <SysContext.Provider
      value={{
        students,
        getStudentById,
        student,
        loadingSys,
      }}
    >
      {children}
    </SysContext.Provider>
  );
};

export { SysProvider };

const useSys = () => {
  const context = useContext(SysContext);
  if (!context) throw new Error("useSys debe estar dentro de SysProvider");
  return context;
};

export default useSys;
