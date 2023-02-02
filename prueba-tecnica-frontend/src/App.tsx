import {useEffect} from 'react'
import { Routes, Route, useLocation } from "react-router-dom";
import AuthLayout from "./components/AuthLayout";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import Error404 from "./pages/Error/Error404";
import RouteAuth from "./pages/RouteAuth";
import Teachers from "./pages/teachers/Teachers";
import Students from "./pages/students/Students";
import { SysProvider } from "./context/SysProvider";
import AddStuden from "./pages/teachers/AddStuden";
import SeeStudents from "./pages/teachers/SeeStudents";
import StudentById from "./pages/students/StudentById";
import StudenPerfil from "./pages/students/StudenPerfil";
import AddCourse from "./pages/teachers/AddCourse";
import SeeCourses from "./pages/teachers/SeeCourses";
import AddCourseToStudent from "./pages/teachers/AddCourseToStudent";

function App() {

  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);



  return (
    <div className="App">
      <SysProvider>
        <main className="mt-20">
          <Routes>
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path="*" element={<Error404 />} />
            </Route>
            <Route path="/inicio" element={<RouteAuth />}>
              <Route path="*" element={<Error404 />} />
              <Route path="maestros" element={<Teachers />} />
              <Route path="alumnos" element={<Students />} />
              <Route path="nuevo-alumno" element={<AddStuden />} />
              <Route path="ver-alumnos" element={<SeeStudents />} />
              <Route path="estudiante/mi-perfil/:id" element={<StudentById />} />
              <Route path="maestro/mi-perfil/:id" element={<StudenPerfil />} />
              <Route path="editar-alumno/:id" element={<AddStuden />} />
              <Route path="ver-alumnos/:id" element={<StudentById />} />
              <Route path="ver-materias" element={<SeeCourses/>} />
              <Route path="agregar-materia" element={<AddCourse />} />
              <Route path="materias-estudiante/:id" element={<AddCourseToStudent />} />
            </Route>
          </Routes>
        </main>
      </SysProvider>

      <ToastContainer />
    </div>
  );
}

export default App;
