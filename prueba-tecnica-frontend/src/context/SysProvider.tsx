import {
  ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "./AuthProvider";
import "react-toastify/dist/ReactToastify.css";
import { clientAxios } from "../helpers/clienteAxios";
import { AllStudents, StudentPerfil, Course } from "../types/users";

interface SysContexTypes {
  students: AllStudents[];
  getStudentById: (id: string) => void;
  student: StudentPerfil;
  loadingSys: boolean;
  submitStudent: (student: any) => void;
  deleteStudent: (id: string) => void;
  logoutSys: () => void;
  addCourse: (course: any) => void;
  courses: Course[];
  getCourse: () => void;
  deleteCourse: (id: string) => void;
  addCourseStudent: (id: string, course: any) => void;
}

const SysContext = createContext<SysContexTypes | null>(null);

const SysProvider = ({ children }: { children: ReactNode }) => {
  const [students, setStudents] = useState<AllStudents[]>([] as AllStudents[]);
  const [student, setStudent] = useState<StudentPerfil>({} as StudentPerfil);
  const [loadingSys, setLoadingsys] = useState<boolean>(false);
  const [courses, setCourses] = useState<Course[]>([] as Course[]);

  const navigate = useNavigate();

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
    } finally {
      setLoadingsys(false);
    }
  };

  const submitStudent = async (student: any) => {
    if (student.id) {
      await updateStudent(student);
    } else {
      await newStudent(student);
    }
  };

  const newStudent = async (student: any) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }
      const { data } = await clientAxios.post<StudentPerfil>(
        "/studen",
        student,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      //sincronizar el estado de los estudiantes
      setStudents([...students, data]);
      toast.success("Estudiante creado con exito");
      setTimeout(() => {
        navigate("/inicio/maestros");
      }, 100);
    } catch (error: any) {
      console.log(error);
      toast.error(
        `${
          error.response.data.message
            ? error.response.data.message
            : "Error al actualizar estudiante error inesperado"
        }`
      );
    }
  };

  const updateStudent = async (student: any) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }
      const { data } = await clientAxios.put<StudentPerfil>(
        `/studen/${student.id}`,
        student,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      //Sincrizar el estado de los estudiantes
      const updateStudents = students.map((studenState) =>
        studenState._id === data._id ? data : studenState
      );
      setStudents(updateStudents);
      toast.info("Estudiante actualizado con exito");
      setTimeout(() => {
        navigate("/inicio/maestros");
      }, 100);
    } catch (error: any) {
      toast.error(
        `${
          error.response.data.message
            ? error.response.data.message
            : "Error al actualizar estudiante error inesperado"
        }`
      );
    }
  };

  const deleteStudent = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }
      await clientAxios.delete<StudentPerfil>(`/studen/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      //Sincrizar el estado de los estudiantes
      const updateStudents = students.filter(
        (studenState) => studenState._id !== id
      );
      setStudents(updateStudents);
      toast.success("Estudiante eliminado con exito");
    } catch (error: any) {
      toast.error(
        `${
          error.response.data.message
            ? error.response.data.message
            : "Error al eliminar estudiante error inesperado"
        }`
      );
    }
    // }

    //!fin
  };

  //!Seccion de las materias

  const getCourse = async () => {
    setLoadingsys(true);
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    try {
      const { data } = await clientAxios.get<Course[]>("/course", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setCourses(data);
    } catch (error: any) {
      console.log(error);
      toast.error(
        `${
          error.response.data.message
            ? error.response.data.message
            : "Error al obtener los cursos error inesperado"
        }`
      );
    } finally {
      setLoadingsys(false);
    }
  };

  const addCourse = async (course: any) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }
      const { data } = await clientAxios.post<any>(`/course`, course, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      //Sincrizar el estado de los estudiantes
      setCourses([...courses, data]);
      toast.success("Curso agregado con exito");
      setTimeout(() => {
        navigate("/inicio/maestros");
      }, 100);
    } catch (error: any) {
      toast.error(
        `${
          error.response.data.message
            ? error.response.data.message
            : "Error al agregar la materia error inesperado"
        }`
      );
    }
  };

  const deleteCourse = async (id: string) => {
    // console.log("Materia", id)
    // return;
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }
      await clientAxios.delete<Course>(`/course/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      //Sincrizar el estado de los estudiantes
      const updateCourses = courses.filter(
        (courseState) => courseState._id !== id
      );
      setCourses(updateCourses);
      toast.success("Curso eliminado con exito");
    } catch (error: any) {
      toast.error(
        `${
          error.response.data.message
            ? error.response.data.message
            : "Error al eliminar el curso error inesperado"
        }`
      );
    }
  };

  const addCourseStudent = async (idStuden: string, course: any) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }
      const { data } = await clientAxios.post<any>(
        `/studen/addcourse/${idStuden}`,
        {
          course,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(data)
      //Sincrizar el estado de los estudiantes
      setStudent(data);

      navigate("/inicio/ver-alumnos");

      toast.success("Alumno agregado a la materia con exito");
    } catch (error: any) {
      console.log(error);
      toast.error(
        `${
          error.response.data.message
            ? error.response.data.message
            : "Error al agregar al alumno a esta materia error inesperado"
        }`
      );
    }
  };

  const logoutSys = () => {
    setStudents([]);
    setStudent({} as StudentPerfil);
  };

  useEffect(() => {
    getStuden();
    getCourse();
  }, [auth]);

  return (
    <SysContext.Provider
      value={{
        students,
        getStudentById,
        student,
        loadingSys,
        submitStudent,
        deleteStudent,
        logoutSys,
        addCourse,
        courses,
        getCourse,
        deleteCourse,
        addCourseStudent,
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
