import { Routes, Route } from "react-router-dom";
import AuthLayout from "./components/AuthLayout";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import Error404 from "./pages/Error/Error404";
import RouteAuth from "./pages/RouteAuth";
import Teachers from "./pages/teachers/Teachers";
import Students from "./pages/students/Students";
import {SysProvider} from './context/SysProvider'
import Navbar from "./components/Navbar";
import AddStuden from "./pages/teachers/AddStuden";
import SeeStudents from "./pages/teachers/SeeStudents";
import StudentById from "./pages/students/StudentById";

function App() {
  return (
    <div className="App">
      <SysProvider>
        <Navbar/>
        <div className="mt-20">
          <Routes>
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path="*" element={<Error404 />} />
            </Route>
            <Route path="/inicio" element={<RouteAuth/>}>
              <Route path="*" element={<Error404 />} />
              <Route path="maestros" element={<Teachers />} />
              <Route path="alumnos" element={<Students/>} />
              <Route path="nuevo-alumno" element={<AddStuden/>} />
              <Route path="ver-alumnos" element={<SeeStudents/>} />
              <Route path="ver-alumnos/:id" element={<StudentById/>} />
            </Route>
          </Routes>
        </div>
      </SysProvider>

      <ToastContainer />
    </div>
  );
}

export default App;
