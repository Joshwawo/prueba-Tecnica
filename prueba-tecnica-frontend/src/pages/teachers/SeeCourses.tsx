import useSystem from "../../context/SysProvider";
import Spinner from "../../components/Spinner";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const SeeCourses = () => {
  const { courses, loadingSys, deleteCourse } = useSystem();

  if (loadingSys) return <Spinner />;
  const handleDelete = (id: string, name: string) => {
    toast(
      (t) => (
        <div className="divo">
          <p className=" text-gray-500 text-center pb-3">
            ¿Estas seguro que quieres eliminarlo? <strong> {name}</strong>{" "}
          </p>
          <div className="flex justify-center">
            <button
              onClick={() => {
                deleteCourse(id);
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
    <div className="container mx-auto">
      <p className="text-center text-2xl mb-10 pt-5  text-gray-700 font-bold">
        Materias dadas de alta en el sistema
      </p>
      <div className="">
        {courses.length > 0 ? (
          <div className="">
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left ">
                <thead className="bg-gray-200">
                  <tr className="text-base">
                    <th scope="col" className="px-6 py-3">
                      Nombre
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Descripción
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Duración
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((course) => (
                    <tr
                      className="bg-gray-100/80 border-b text-gray-700 font-semibold"
                      key={course._id}
                    >
                      <td scope="row" className="px-6 py-4 ">
                        {course.name}
                      </td>
                      <td scope="row" className="px-6 py-4">
                        {course.description}
                      </td>
                      <td scope="row" className="px-6 py-4">
                        {course.duration}
                      </td>
                      <td scope="row" className="px-6 py-4">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            handleDelete(course._id, course.name);
                          }}
                          className="text-red-500 hover:text-red-700"
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <p className="text-center text-2xl text-gray-700">
            No hay materias dadas de alta, puedes agregar materias{" "}
            <Link className="text-green-400" to={"/inicio/agregar-materia"}>
              aquí
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default SeeCourses;
