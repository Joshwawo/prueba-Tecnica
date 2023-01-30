import { Link } from "react-router-dom";
import useSystem from "../../context/SysProvider";

const SeeStudents = () => {
  const { students } = useSystem();
  
  return (
    <div className="container mx-auto mb-5 w-screen  ">
      <p className="text-2xl font-semibold capitalize text-gray-800 px-4 md:px-0" >Listado de todos los alumnos</p>
      <div className="grid md:grid-cols-2 md:gap-5">
        {students?.map((student) => (
          <div
            className="bg-gray-100 mx-4 md:mx-0 mt-5 py-5 px-4 flex justify-between items-start rounded-md "
            key={student._id}
          >
            <div className="font-semibold">
              <p>Nombre: {student.name}</p>
              <p>Apellido: {student.lastName}</p>
              <p>Matricula: {student.userName}</p>
            </div>
            <div className="font-semibold text-center ">
              <Link className=" text-green-500 hover:text-green-700"  to={`/inicio/ver-alumnos/${student._id}` }>
                <p className="bg-green-200 px-2 py-1 mb-2 rounded-sm ">Ver estudiante</p>
              </Link>
              <Link className="text-cyan-500 hover:text-cyan-700" to={`/inicio/ver-alumnos/${student._id}`}>
                <p className="bg-cyan-200 px-2 py-1 mb-2 rounded-sm ">Editar estudiante</p>
              </Link>
              <Link className="text-red-500 hover:text-red-700" to={`/inicio/ver-alumnos/${student._id}`}>
                <p className=" bg-red-100 px-2 py-0.5 ">Eliminar estudiante</p>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeeStudents;
