import useAuth from "../../context/AuthProvider";
import {Link} from 'react-router-dom'

const Teachers = () => {
  const { auth } = useAuth();

  return (
    <div className="h-screen w-screen">
      <p className="text-2xl mb-10 text-center text-gray-800 font-semibold">Bienvenido maestro</p>
      <div className="grid px-10 sm:px-0 grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5 gap-5 font-bold text-gray-600 capitalize container mx-auto">
        <Link className="bg-gray-100 py-10 px-5 hover:bg-gray-200 my-4 rounded-md " to={'/inicio/nuevo-alumno'}>Agregar Alumnos</Link>

        <Link className="bg-gray-100 py-10 px-5 hover:bg-gray-200 my-4 rounded-md " to={"/inicio/ver-alumnos"}>Ver Alumnos</Link>

        <Link className="bg-gray-100 py-10 px-5 hover:bg-gray-200 my-4 rounded-md " to={"/inicio/agregar-materia"}>Agregar materias</Link>

        <Link className="bg-gray-100 py-10 px-5 hover:bg-gray-200 my-4 rounded-md " to={"/inicio/ver-materias"}>Ver materias</Link>

         <Link className="bg-gray-100 py-10 px-5 hover:bg-gray-200 my-4 rounded-md " to={`/inicio/mi-perfil/${auth._id}`} >Mi Perfil</Link> 
      </div>
    </div>
  );
};

export default Teachers;
