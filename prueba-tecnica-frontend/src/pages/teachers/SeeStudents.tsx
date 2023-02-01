import { Link } from "react-router-dom";
import useSystem from "../../context/SysProvider";
import { toast } from "react-toastify";

const SeeStudents = () => {
  const { students, deleteStudent } = useSystem();

  const handleDelete = (id: string, name: string) => {
    toast(
      (t) => (
        <div className="divo">
          <p className=" text-gray-500 text-center pb-3">
            ¿Estas seguro que quieres eliminarlo?  <strong> {name}</strong>{" "}
          </p>
          <div className="flex justify-center">
            <button
              onClick={() => {
                deleteStudent(id);
                toast.dismiss(id);
              }}
              className=" bg-red-400 hover:bg-red-600 px-1.5 py-1.5   text-white font-semibold rounded-md mx-2"
            >
              Eliminar
            </button>
            <button
              onClick={() => toast.dismiss(id)}
              className=" bg-orange-400 hover:bg-orange-300 px-1.5 py-1.5  text-white rounded-md mx-2"
            >
              Cancelar
            </button>
          </div>
        </div>
      ),
      {
        className: "bg-gray-100",
        autoClose: false,
        position: "top-center",
      }
    );
  };

  return (
    <div className="container mx-auto mb-5 w-screen  ">
      <p className="text-2xl font-semibold capitalize text-gray-800 px-4 md:px-0">
        Listado de todos los alumnos
      </p>
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
            <div className="font-semibold text-center space-y-2 ">
              <Link
                className=" text-green-500 hover:text-green-700 bg-green-200 flex pl-2 items-center rounded-md"
                to={`/inicio/ver-alumnos/${student._id}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 15l6-6m0 0l-6-6m6 6H9a6 6 0 000 12h3"
                  />
                </svg>

                <p className=" px-2 py-1  rounded-sm ">
                  Ver estudiante
                </p>
              </Link>
              <Link
                className="text-cyan-500 hover:text-cyan-700 bg-cyan-200 flex pl-2 items-center rounded-md"
                to={`/inicio/editar-alumno/${student._id}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  />
                </svg>

                <p className=" px-2 py-1 rounded-sm ">Editar estudiante</p>
              </Link>
              <button
                className="text-red-500 hover:text-red-700 flex bg-red-100 pl-2 items-center rounded-md"
                onClick={(e) => {
                  e.preventDefault();
                  handleDelete(student._id, student.name);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>

                <p className="  px-2 py-0.5 rounded-sm">Eliminar estudiante</p>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeeStudents;
