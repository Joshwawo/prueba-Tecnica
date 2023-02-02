import {useParams } from "react-router-dom";
import useSystem from "../../context/SysProvider";
import { useEffect } from "react";
import { formatDates } from "../../helpers/FormatDate";
import Spinner from "../../components/Spinner";
import "react-toastify/dist/ReactToastify.css";

const StudentById = () => {
  const { getStudentById, student, loadingSys } = useSystem();
  const { id } = useParams<{ id: string }>();
  useEffect(() => {
    getStudentById(String(id));
  }, []);

  

  if (loadingSys) {
    return <Spinner />;
  }

  return (
    <div className="container mx-auto md:flex justify-around pt-5">
      <div className="text-xl text-gray-600">
        <p className="mb-2 text-gray8800 text-3xl">Detalles del estudiante</p>
        <p className="">Alumno: <strong>{student?.name}</strong></p>
        <p>Apellido: <strong>{student?.lastName}</strong></p>
        <p>Matricula: {student?.userName}</p>
        <p>Sexo: {student?.sex}</p>
        <p>Correo: {student?.email}</p>
        <p>Fecha de nacimiento: {formatDates(`${student?.dateBirth}`)}</p>
        <div className="">
          {student?.course?.length > 0 ? (
          
            <div className="mt-10">
              <div className="relative overflow-x-auto">
                <p className="mb-5 text-2xl">Materias inscrito</p>
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-200">
                    <tr className="text-base">
                      <th scope="col" className="px-6 py-3">
                        Nombre materia
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Descripción
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Duración
                      </th>
                      
                    </tr>
                  </thead>
                  <tbody>
                    {student?.course?.map((course) => (
                      <tr
                        className="bg-gray-100/80 border-b text-gray-700 font-semibold"
                        key={course?._id}
                      >
                        <td scope="row" className="px-6 py-4 ">
                          {course?.name}
                        </td>
                        <td scope="row" className="px-6 py-4">
                          {course?.description}
                        </td>
                        <td scope="row" className="px-6 py-4">
                          {course?.duration}
                        </td>
                        
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <p className="text-center text-2xl text-gray-600 mt-10">
              Este estudiante no esta inscrito en ninguna materia
              
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentById;
